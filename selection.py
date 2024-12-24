def selection_sort(arr):

    n = len(arr)

    for i in range(n):

        # Find the minimum element in unsorted part

        min_index = i

        for j in range(i + 1, n):

            if arr[j] < arr[min_index]:

                min_index = j

        # Swap the found minimum element with the first element

        arr[i], arr[min_index] = arr[min_index], arr[i]

    return arr

arr = [15, 10, 3, 20, 15]

print("Before bubble sorting: ", arr)

sortedarr = selection_sort(arr)

print("After bubble sorting: ",sortedarr)