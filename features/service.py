"""Operations that are more complex than a single model should handle"""

from django.db.models import Max, F

from .models import Client

def shift_client_priority(start, queryset):
    """Increase FeatureRequest.client_priority until the value `start` is free

    start: Value of client_priority that should be free
    queryset: QuerySet to shift
    """

    # TODO: Fix potential race condition if objects are inserted
    # during reordering process

    # All models that may need to be shifted
    potential = queryset.filter(client_priority__gte=start)

    # Highest priority value in potential queryset
    # This is really ugly; why did you make do that, Django?
    max_priority = potential.aggregate(Max('client_priority')).popitem()[1]

    # List of all priority values
    priorities = potential.values_list('client_priority', flat=True)\
                          .order_by('client_priority')

    # Set of possible priority values
    total = set(range(start, max_priority+1))

    # Subtract the set of used values, leaving unused values!
    gaps = total - set(priorities)

    if gaps:
        # First value free after start
        stop = min(gaps)
    else:
        stop = max_priority

    # We only need to change those with start <= client_priority <= stop
    to_update = potential.filter(client_priority__lte=stop)\
                         .order_by('-client_priority')

    # Increment them manually to avoid integrity violations
    for feature in to_update:
        feature.client_priority = F('client_priority') + 1
        feature.save()
