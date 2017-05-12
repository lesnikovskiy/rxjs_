import { Observable } from "rxjs";

const output = document.getElementById("output");
const button = document.getElementById("button");

let click = Observable.fromEvent(button, "click");

function load(url: string) {
    return Observable.create(observer => {
        const xhr = new XMLHttpRequest();

        xhr.addEventListener("load", () => {
            let data = JSON.parse(xhr.responseText);
            observer.next(data);
            observer.complete();
        });

        xhr.open("GET", url);
        xhr.send();
    });
}

function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement("div");
        div.innerHTML = m.title;
        output.appendChild(div);
    });
}

load("movies.json").subscribe(renderMovies);

click.flatMap(e => load("movies.json"))
    .subscribe(
        movies => renderMovies(movies),
        error => console.log(`error: ${error}`),
        () => console.log("complete")
    );
