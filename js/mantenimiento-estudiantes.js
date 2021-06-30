const componentContainer = document.querySelector('.component-container')

if (componentContainer.getAttribute('id') === "consulta") {
    document.querySelector('#nav-consulta').style.color = "yellow";
} else if (componentContainer.getAttribute('id') === "alta") {
    document.querySelector('#nav-alta').style.color = "yellow";
} else {
    document.querySelector('#nav-mantenimiento').style.color = "yellow";
}