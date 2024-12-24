def bubble_sort(arr):

    n = len(arr)

    for i in range(n):

        # Flag to check if any swaps happened in the current pass

        swapped = False

        # Last i elements are already in place

        for j in range(0, n - i - 1):

            if arr[j] > arr[j + 1]:

                # Swap if the element is greater than the next element

                arr[j], arr[j + 1] = arr[j + 1], arr[j]

                swapped = True

        # If no elements were swapped, the list is already sorted

        if not swapped:

            break

    return arr



arr = [15, 10, 3, 20, 15]

print("Before bubble sorting: ", arr)

sortedarr = bubble_sort(arr)

print("After bubble sorting: ",sortedarr)