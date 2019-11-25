
function importAll(r) {
    return r.keys().map(r);
}

function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

const images = importAll(require.context('../src/images/', false, /\.(png|jpe?g|svg)$/));
let shuffleImages = shuffle(images).slice(210);

const tileData = shuffleImages.reduce((arr,img) => {
    arr.push({
        img: img,
        title: 'fun',
        author: 'image by Free-Photos on Pixabay',
        featured: true,
    });
    return arr;
},[]);

export default tileData