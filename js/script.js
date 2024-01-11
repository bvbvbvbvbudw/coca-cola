document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('hamburger').addEventListener('click', function() {
        this.classList.toggle('open');
    });
})