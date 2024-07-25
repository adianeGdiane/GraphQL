package backend

import (
	"fmt"
	"net/http"
	"text/template"
)

func LoginHandle(w http.ResponseWriter, r *http.Request) {
	temp, err := template.ParseGlob("front-end/static/html/*")
	
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	if r.URL.Path != "/" {
		if err1 := temp.ExecuteTemplate(w, "error404.html",nil); err1 != nil {
			fmt.Println(err1.Error())
			return
		}
		r.Header.Set(http.StatusText(404), http.StatusText(404))
		return
	}



	if err1 := temp.ExecuteTemplate(w, "index.html",nil); err1 != nil {
		fmt.Println(err1.Error())
		return
	}
}
