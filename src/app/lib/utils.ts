export function getDecalImageUrl(decalId: BigInt | string): string {
    
    const idString = decalId.toString();
    
    const part1 = idString.substring(0, 2);
    const part2 = idString.substring(2, 4);
    const part3 = idString.substring(4, 6);
    const part4 = idString.substring(6, 8);

    const url = `/decals/${part1}/${part2}/${part3}/${part4}/${idString}.svg`;
    return url;
}