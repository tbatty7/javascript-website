function onClick(inputName) {
    document.getElementById("displayedText").innerHTML = "Now I am in control";
    alert('Hello, ' + inputName + '!');
    const user = {name: 'Bob'};
    console.log('Hello ' + user.name);

    const names = ['Sally', 'Jerome']
    const users = [{name: 'Sally'}, {name: 'Jerome'}];
    console.log('First name in list -----',names[0]);

    console.log('Second name in list of objects -----',users[1].name);
}