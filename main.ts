import { Observable } from "rxjs";

import { load, loadWithFetch } from "./loader";

let source = Observable.create(observer => {
    observer.next(1);
    observer.next(2);
    observer.error("Stop!");
    observer.next(3);
    observer.complete();
});

source.subscribe(
    value => console.log(`value: ${value}`),
    e => console.log(`Error: ${e}`),
    () => console.log("Complete")
);

// const output = document.getElementById("output");
// const button = document.getElementById("button");

// let click = Observable.fromEvent(button, "click");

// function renderMovies(movies) {
//     movies.forEach(m => {
//         let div = document.createElement("div");
//         div.innerHTML = m.title;
//         output.appendChild(div);
//     });
// }

//loadWithFetch("movies.json").subscribe(renderMovies);
// //load("movies.json").subscribe(renderMovies);

// click.flatMap(e => loadWithFetch("movies.json"))
//     .subscribe(
//     movies => renderMovies(movies),
//     error => console.log(`error: ${error}`),
//     () => console.log("complete")
// );
