const bg = '#4CAF50'
const c1 = 'red';   //What is selected
const c2 = 'blue';  //With whom to swap
const c3 = 'pink';  //Looking for
const c4 = "grey";  //Sorted
var size = 25;
var lower = 30;
var upper = 200;
t=100;
var playing = true;
var end = false;


const nums = document.getElementById("nums");
const comment = document.getElementById("comment");
const play = document.getElementById("play");
const stopBtn = document.getElementById("stop");


document.addEventListener('DOMContentLoaded', () => {
    const arrayContainer = document.getElementById("array-bar-container");
    let array = generateRandomArray(size);
  
    // Initial render
    renderArray(array);
  
    // Button Event Listeners
    document.getElementById("startBubbleSort").addEventListener("click", () => sort(array, "bs"));
    document.getElementById("startSelectionSort").addEventListener("click", () => sort(array, "ss"));
    document.getElementById("startInsertionSort").addEventListener("click", () => sort(array, "is"));
    play.addEventListener("click", () => playPause());
    stopBtn.addEventListener("click", function(){ end = true });
    document.getElementById("randomizeArray").addEventListener("click", () => {
      array = generateRandomArray(size);
      renderArray(array);
    });
  
    // Generate a random array
    function generateRandomArray(size) {
      console.log("Size: ", size)
      const arr = [];
      for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * Math.max(upper, 0)) + Math.min(lower, 300)); // Random number between 10 and 100
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
        while(!playing)
          sleep(1000);
      }


      
  async function sort(arr, algo)
  {
    document.getElementById("startBubbleSort").disabled = true;
    document.getElementById("startInsertionSort").disabled = true;
    document.getElementById("startSelectionSort").disabled = true;
    document.getElementById("randomizeArray").disabled = true;
    end = false;
    if(play.innerHTML == "Play")  playPause();

    switch (algo) {
      case "bs":
        await bubbleSort(arr);
        break;
      
        case "ss":
          await selectionSort(arr);
          break;

        
      case "is":
        await insertionSort(arr);
        break;
    
      default:
        break;
    }

    sortEnd();
  }
      
  
    // Bubble Sort Algorithm
    async function bubbleSort(arr) {
        document.getElementById("sortName").innerHTML = "Performing Bubble Sort";
        document.getElementById("value").innerHTML = "";
      let n = arr.length;
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            comment.innerText = "";
            let bars = document.querySelectorAll('.array-bar');
            nums.innerHTML = `Comparing ${ bars[j].innerHTML} and ${bars[j+1].innerHTML}`;
            bars[j].style.backgroundColor = c1;
            bars[j + 1].style.backgroundColor = c1;
          
          if (arr[j] > arr[j + 1]) {
            comment.innerText = `${bars[j].innerHTML} > ${bars[j + 1].innerHTML}, hence swap the numbers`;
            // Swap the bars
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            bars[j + 1].style.backgroundColor = c2;
            await sleep(t); // Pause for visualization
            renderArray(arr);
            if(end) return;
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
      if(end) return;
      sortEnd();
    }
  
    // Selection Sort Algorithm
    async function selectionSort(arr) {
        document.getElementById("sortName").innerHTML = "Performing Selection Sort";
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
          if(end) return;
          bars[minIdx].style.backgroundColor = bg;
          bars[j].style.backgroundColor = bg;
        }
        // Swap the bars
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        renderArray(arr);
        if(end) return;
        const bars = document.querySelectorAll('.array-bar');
        bars[i].style.backgroundColor = c2;
        bars[minIdx].style.backgroundColor = c1;
        await sleep(t); // Pause for visualization
        renderArray(arr);
        if(end) return;
        bars[minIdx].style.backgroundColor = bg;
        bars[i].style.backgroundColor = c4;
      }
      document.querySelectorAll('.array-bar')[n-1].style.backgroundColor = c4;
      renderArray(arr);
      if(end) return;
      sortEnd();
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
        if(end) return;
        bars[j].style.backgroundColor = c2;
        await sleep(t); // Pause for visualization
        renderArray(arr); // Update the array visualization
        if(end) return;
        arr[j + 1] = arr[j];  // Shift element
        renderArray(arr); // Update the array visualization
        if(end) return;
        await sleep(t); // Pause for visualization
        bars[i].style.backgroundColor = bg;
        j--;
        // bars[j+2].style.backgroundColor = bg;  
        // await sleep(t); // Pause for visualization
        // renderArray(arr); // Update the array visualization
      if(end) return;
        bars[j+2].style.backgroundColor = bg;
        await sleep(t); // Pause for visualization
        renderArray(arr); // Update the array visualization
        if(end) return;
      }
      
      // Place the key in its correct position
      arr[j + 1] = key;
      renderArray(arr); // Update the array visualization
      if(end) return;
      await sleep(t); // Pause for visualization
      bars[j+1].style.backgroundColor = c4; 
      await sleep(t); // Pause for visualization
      renderArray(arr); // Update the array visualization
      if(end) return;
      
      // Reset the color of the current element after insertion
      bars[i].style.backgroundColor = bg; 
      bars[j+1].style.backgroundColor = bg; 
    }
  
    // Final render after sorting is complete
    renderArray(arr);
    if(end) return;
    sortEnd();
  }
  
  
  
    // Sleep function to create delay
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  });
  

  function sortEnd()
  {
    document.getElementById("startBubbleSort").disabled = false;
    document.getElementById("startInsertionSort").disabled = false;
    document.getElementById("startSelectionSort").disabled = false;
    document.getElementById("randomizeArray").disabled = false;
    const bars = document.querySelectorAll(".array-bar")
    bars.forEach(element => {
      console.log(element)
      element.style.backgroundColor = bg;
    });
    
  }

  function playPause()
  {
    if (play.innerHTML == "Play")
    {
      play.innerHTML = "Pause";
      playing = true;
      return;
    }
    if(play.innerHTML == "Pause")
    {
      play.innerHTML = "Play";
      playing = false;
    }
  }