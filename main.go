package main

import (
	"context"

	"github.com/suraj-swarnapuri/discogify/discog"
)

func main() {

	dc, err := discog.New(context.Background())
	if err != nil {
		panic(err)
	}

	dc.GetUser()


}