async function insertionSort(visualizer) {
    const n = visualizer.array.length;
    document.getElementById('complexity').textContent = 'O(n²)';

    visualizer.markSorted(0);
    
    for (let i = 1; i < n; i++) {
        let j = i;
        while (j > 0) {
            await visualizer.compare(j, j - 1);
            if (visualizer.array[j] < visualizer.array[j - 1]) {
                await visualizer.swap(j, j - 1);
                j--;
            } else {
                break;
            }
        }
        visualizer.markSorted(i);
    }
} 