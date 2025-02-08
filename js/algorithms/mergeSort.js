async function mergeSort(visualizer) {
    document.getElementById('complexity').textContent = 'O(n log n)';
    await mergeSortHelper(visualizer, 0, visualizer.array.length - 1);
}

async function mergeSortHelper(visualizer, left, right) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        await mergeSortHelper(visualizer, left, mid);
        await mergeSortHelper(visualizer, mid + 1, right);
        await merge(visualizer, left, mid, right);
    }
}

async function merge(visualizer, left, mid, right) {
    const leftArray = visualizer.array.slice(left, mid + 1);
    const rightArray = visualizer.array.slice(mid + 1, right + 1);
    
    let i = 0;
    let j = 0;
    let k = left;
    
    while (i < leftArray.length && j < rightArray.length) {
        await visualizer.compare(left + i, mid + 1 + j);
        
        if (leftArray[i] <= rightArray[j]) {
            visualizer.array[k] = leftArray[i];
            await updateVisualizer(visualizer, k, leftArray[i]);
            i++;
        } else {
            visualizer.array[k] = rightArray[j];
            await updateVisualizer(visualizer, k, rightArray[j]);
            j++;
        }
        k++;
    }
    
    while (i < leftArray.length) {
        visualizer.array[k] = leftArray[i];
        await updateVisualizer(visualizer, k, leftArray[i]);
        i++;
        k++;
    }
    
    while (j < rightArray.length) {
        visualizer.array[k] = rightArray[j];
        await updateVisualizer(visualizer, k, rightArray[j]);
        j++;
        k++;
    }
    
    for (let idx = left; idx <= right; idx++) {
        visualizer.markSorted(idx);
    }
}

async function updateVisualizer(visualizer, index, value) {
    const bar = visualizer.container.children[index];
    bar.style.height = `${(value / visualizer.maxValue) * 100}%`;
    bar.setAttribute('data-value', value);
    await visualizer.sleep();
} 