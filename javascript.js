function onPress(inputName) {
    const url = 'https://pokeapi.co/api/v2/pokemon';
    $.get(url,function(data, status){
        console.log(status);
    });
}
