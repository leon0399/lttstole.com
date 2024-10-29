export function parseMarkdownTable(markdown: string): Array<{ [key: string]: string }> {
    // Remove code fences and empty lines
    const lines = markdown
        .split('\n')
        .filter(line => !line.trim().startsWith('```') && line.trim() !== '');

    // Find the header line
    const headerIndex = lines.findIndex(line => line.trim().startsWith('|'));
    if (headerIndex === -1) return []; // No header found

    // Extract header columns
    const headerLine = lines[headerIndex];
    const headerColumns = headerLine
        .split('|')
        .map(cell => cell.trim())
        .filter(cell => cell);

    // Skip the alignment line and start processing data lines
    const dataLines = lines.slice(headerIndex + 2);

    const data = dataLines.map(line => {
        if (!line.trim().startsWith('|')) return null; // Skip invalid lines

        const cells = line
            .split('|')
            .map(cell => cell.trim())
            .filter(cell => cell);

        if (cells.length !== headerColumns.length) return null; // Mismatched columns

        const row: { [key: string]: string } = {};
        headerColumns.forEach((header, i) => {
            row[header] = cells[i];
        });

        return row;
    });

    // Filter out any nulls from invalid lines
    return data.filter(row => row !== null) as Array<{ [key: string]: string }>;
}
