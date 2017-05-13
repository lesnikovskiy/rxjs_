import { Observable } from "rxjs";

import { load, loadWithFetch } from "./loader";

const output = document.getElementById("output");
const button = document.getElementById("button");

let click = Observable.fromEvent(button, "click");

function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement("div");
        div.innerHTML = m.title;
        output.appendChild(div);
    });
}

const subscription = load("movies.json")
    .subscribe(
        renderMovies,
        e => console.log(`error: ${e}`),
        () => console.log("complete")
    );

console.log(subscription);
subscription.unsubscribe();

click.flatMap(e => loadWithFetch("movies.json"))
    .subscribe(
    movies => renderMovies(movies),
    error => console.log(`error: ${error}`),
    () => console.log("complete")
);
