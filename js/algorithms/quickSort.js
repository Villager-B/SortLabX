async function quickSort(visualizer) {
    document.getElementById('complexity').textContent = 'O(n log n)';
    await quickSortHelper(visualizer, 0, visualizer.array.length - 1);
}

async function quickSortHelper(visualizer, low, high) {
    if (low < high) {
        const pivotIndex = await partition(visualizer, low, high);
        visualizer.markSorted(pivotIndex);
        
        await quickSortHelper(visualizer, low, pivotIndex - 1);
        await quickSortHelper(visualizer, pivotIndex + 1, high);
    } else if (low === high) {
        visualizer.markSorted(low);
    }
}

async function partition(visualizer, low, high) {
    const pivot = visualizer.array[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        await visualizer.compare(j, high);
        if (visualizer.array[j] <= pivot) {
            i++;
            if (i !== j) {
                await visualizer.swap(i, j);
            }
        }
    }
    
    if (i + 1 !== high) {
        await visualizer.swap(i + 1, high);
    }
    return i + 1;
} 