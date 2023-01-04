import React, { useCallback, useState } from "react"
import { Card } from "react-bootstrap"
import { AsyncTypeahead } from "react-bootstrap-typeahead"
import "react-bootstrap-typeahead/css/Typeahead.css"
import axios from "axios"
import { axiosConfig } from "./actions/actions.js"

const NameSearch = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState([])

  const handleInput = (input) => {
    // triggered when item selected from typeahead dropdown list, but user can
    // also edit it so need to check it is a valid name
    if (input.length > 0) {
      props.onNameSelected(input[0].Name)
    }
  }

  const handleSearch = useCallback((query) => {
    // know we have at least 3 characters because of minLength property
    setIsLoading(true)
    axios.get("/namesearch/" + query, axiosConfig).then((json) => {
      setOptions(json.data)
      setIsLoading(false)
    })
  }, [])

  return (
    <div className="row">
      <div className="col-md-12 mb-2">
        <Card>
          <Card.Header className="bg-arbor text-white">
            {props.caption}
          </Card.Header>
          <Card.Body
            className="ag-theme-fresh"
            style={{ height: "50px", marginBottom: "20px" }}
          >
            <AsyncTypeahead
              id="name-search"
              isLoading={isLoading}
              options={options}
              labelKey="Name"
              onSearch={handleSearch}
              onChange={handleInput}
              placeholder="Name search..."
              caseSensitive={false}
              minLength={3}
              renderMenuItemChildren={(option) => (
                <div>
                  <span>{option.Name}</span>
                </div>
              )}
            />
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default NameSearch
