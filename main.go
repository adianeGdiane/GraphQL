package main

import (
	backend "graphQl/back-end"
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir("front-end/static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	http.HandleFunc("/", backend.LoginHandle)
	http.ListenAndServe(":8080", nil)
}
