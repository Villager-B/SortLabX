async function selectionSort(visualizer) {
    const n = visualizer.array.length;
    document.getElementById('complexity').textContent = 'O(n²)';

    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        
        for (let j = i + 1; j < n; j++) {
            await visualizer.compare(j, minIdx);
            if (visualizer.array[j] < visualizer.array[minIdx]) {
                minIdx = j;
            }
        }

        if (minIdx !== i) {
            await visualizer.swap(i, minIdx);
        }
        visualizer.markSorted(i);
    }
    visualizer.markSorted(n - 1);
} 