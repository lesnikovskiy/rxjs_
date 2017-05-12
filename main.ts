import { Observable } from "rxjs";

const output = document.getElementById("output");
const button = document.getElementById("button");

let click = Observable.fromEvent(button, "click");

function load(url: string) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
        let movies = JSON.parse(xhr.responseText);
        movies.forEach(m => {
            let div = document.createElement("div");
            div.innerHTML = m.title;
            output.appendChild(div);
        });
    });

    xhr.open("GET", url);
    xhr.send();
}

click.subscribe(
    e => load("movies.json"),
    error => console.log(`error: ${error}`),
    () => console.log("complete")
);
