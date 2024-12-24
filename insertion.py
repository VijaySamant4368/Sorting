def insertion_sort(arr):

    for i in range(1, len(arr)):

        key = arr[i]

        j = i - 1

        # Move elements of arr[0..i-1] that are greater than key

        # to one position ahead of their current position

        while j >= 0 and key < arr[j]:

            arr[j + 1] = arr[j]

            j -= 1

        arr[j + 1] = key

    return arr

arr = [15, 10, 3, 20, 15]

print("Before bubble sorting: ", arr)

sortedarr = insertion_sort(arr)

print("After bubble sorting: ",sortedarr)