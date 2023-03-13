{
    const form = new FormData();
    form.append('image', File.ReadAllBytes("images/useful_reaction.png"));
    fetch('https://api.imgbb.com/1/upload?key=ae96aa94d0bd78b3cc284bfd7119f34b', {
        method: 'POST',
        form
    })
        .then((response) => response.json())
        .then((data) => console.log(data));
}