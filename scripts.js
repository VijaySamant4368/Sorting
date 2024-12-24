const bg = '#4CAF50'
const c1 = 'red';   //What is selected
const c2 = 'blue';  //With whom to swap
const c3 = 'pink';  //Looking for
const c4 = "grey";  //Sorted
const delta = 5;
var size = 5;
t=1000;


const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const comment = document.getElementById("comment");


document.addEventListener('DOMContentLoaded', () => {
    const arrayContainer = document.getElementById("array-bar-container");
    let array = generateRandomArray(size);
  
    // Initial render
    renderArray(array);
  
    // Button Event Listeners
    document.getElementById("startBubbleSort").addEventListener("click", () => bubbleSort(array));
    document.getElementById("startSelectionSort").addEventListener("click", () => selectionSort(array));
    document.getElementById("startInsertionSort").addEventListener("click", () => insertionSort(array));
    document.getElementById("randomizeArray").addEventListener("click", () => {
      array = generateRandomArray(20);
      renderArray(array);
    });
  
    // Generate a random array
    function generateRandomArray(size) {
      const arr = [];
      for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * 80) + 10); // Random number between 10 and 100
      }
      return arr;
    }
  
    // Render the array on the page
    function createArray(arr) {
      arrayContainer.innerHTML = '';
      arr.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('array-bar');
        bar.style.height = `${value}px`;
        bar.innerHTML = value;
        arrayContainer.appendChild(bar);
      });
    }


    function renderArray(arr) {
        if(!document.querySelectorAll('.array-bar')[0])
        {
            createArray(arr);
            return
        }
        const bars = document.querySelectorAll('.array-bar');
        // Update the height and value of each bar based on the current array
        arr.forEach((value, index) => {
          const bar = bars[index];
          bar.style.height = `${value}px`;  // Update height
          bar.innerHTML = value;            // Update the value displayed on the bar
        });
      }
      
  
    // Bubble Sort Algorithm
    async function bubbleSort(arr) {
        document.getElementById("sortName").innerHTML = "Bubble Sort";
        document.getElementById("value").innerHTML = "";
      let n = arr.length;
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            comment.innerText = "";
            let bars = document.querySelectorAll('.array-bar');
            num1.innerHTML = bars[j].innerHTML;
            num2.innerHTML = bars[j+1].innerHTML;
            bars[j].style.backgroundColor = c1;
            bars[j + 1].style.backgroundColor = c1;
          
          if (arr[j] > arr[j + 1]) {
            comment.innerText = `${bars[j].innerHTML} > ${bars[j + 1].innerHTML}, hence swap the numbers`;
            // Swap the bars
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            bars[j + 1].style.backgroundColor = c2;
            await sleep(t); // Pause for visualization
            renderArray(arr);
            bars[j].style.backgroundColor = c2;
            bars[j + 1].style.backgroundColor = c1;
            comment.innerText = "Swapped";
          } else {
            bars[j + 1].style.backgroundColor = c3;
          }
          await sleep(t); // Pause for visualization
          bars[j].style.backgroundColor = bg;
          bars[j + 1].style.backgroundColor = bg;
        }
        comment.innerText = `${ document.querySelectorAll('.array-bar')[n-i-1].innerHTML} bubbled up`;
        document.querySelectorAll('.array-bar')[n-i-1].style.backgroundColor = c4;
        await sleep(t); // Pause for visualization
      }
      document.querySelectorAll('.array-bar')[0].style.backgroundColor = c4;
      renderArray(arr);
    }
  
    // Selection Sort Algorithm
    async function selectionSort(arr) {
        document.getElementById("sortName").innerHTML = "Selection Sort";
        document.getElementById("value").innerHTML = "";
      let n = arr.length;
      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
          const bars = document.querySelectorAll('.array-bar');
          bars[minIdx].style.backgroundColor = c2;
          bars[i].style.backgroundColor = c1;
          
          if (arr[j] < arr[minIdx]) {
            bars[minIdx].style.backgroundColor = bg;
            bars[i].style.backgroundColor = c1;
            minIdx = j;
            bars[minIdx].style.backgroundColor = c2;
          } else {
            bars[j].style.backgroundColor = c3;
          }
          
         if( bars[j-1].style.backgroundColor == c3) bars[j-1].style.backgroundColor= bg;
          await sleep(t); // Pause for visualization
          bars[minIdx].style.backgroundColor = bg;
          bars[j].style.backgroundColor = bg;
        }
        // Swap the bars
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        renderArray(arr);
        const bars = document.querySelectorAll('.array-bar');
        bars[i].style.backgroundColor = c2;
        bars[minIdx].style.backgroundColor = c1;
        await sleep(t); // Pause for visualization
        renderArray(arr);
        bars[minIdx].style.backgroundColor = bg;
        bars[i].style.backgroundColor = c4;
      }
      document.querySelectorAll('.array-bar')[n-1].style.backgroundColor = c4;
      renderArray(arr);
    }

    // Insertion Sort Algorithm
async function insertionSort(arr) {
    let n = arr.length;
    const bars = document.querySelectorAll('.array-bar'); // Only call this once
    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;
  
      // Color the key and the element being compared
      bars[i].style.backgroundColor = c1;  // Color for the current element being inserted
    //   bars[j].style.backgroundColor = c3;  // Color for the element being compared to the key
      
      // Move elements of arr[0..i-1] that are greater than the key to one position ahead
      while (j >= 0 && arr[j] > key) {
        bars[j+1].style.backgroundColor = c1;  // Color for the element being shifted
        await sleep(t); // Pause for visualization
        renderArray(arr); // Update the array visualization
        bars[j].style.backgroundColor = c2;
        await sleep(t); // Pause for visualization
        renderArray(arr); // Update the array visualization
        arr[j + 1] = arr[j];  // Shift element
        renderArray(arr); // Update the array visualization
        await sleep(t); // Pause for visualization
        bars[i].style.backgroundColor = bg;
        j--;
        // bars[j+2].style.backgroundColor = bg;  
        // await sleep(t); // Pause for visualization
        // renderArray(arr); // Update the array visualization
        bars[j+2].style.backgroundColor = bg;
        await sleep(t); // Pause for visualization
        renderArray(arr); // Update the array visualization
      }
      
      // Place the key in its correct position
      arr[j + 1] = key;
      renderArray(arr); // Update the array visualization
      await sleep(t); // Pause for visualization
      bars[j+1].style.backgroundColor = c4; 
      await sleep(t); // Pause for visualization
      renderArray(arr); // Update the array visualization
      
      // Reset the color of the current element after insertion
      bars[i].style.backgroundColor = bg; 
      bars[j+1].style.backgroundColor = bg; 
    }
  
    // Final render after sorting is complete
    renderArray(arr);
  }
  
  
  
    // Sleep function to create delay
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  });
  