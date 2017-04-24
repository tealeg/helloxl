package main

import (
	"testing"
)

func TestAPIHandler(t *testing.T) {
	recorder := newTestRequest("POST", "/api/conversion")
	expectedStatusCode := 200
	if recorder.Code != expectedStatusCode {
		t.Errorf("Expected response status code `%d`, got `%d`", expectedStatusCode, recorder.Code)
	}

	
}
