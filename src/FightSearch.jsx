import React, { useCallback, useState } from "react"
import { Card } from "react-bootstrap"
import { AsyncTypeahead } from "react-bootstrap-typeahead"
import axios from "axios"
import { axiosConfig } from "./actions/actions.js"

const FightSearch = (props) => {
  const [options, setOptions] = useState([])

  const handleSearch = useCallback((query) => {
    // know we have at least 3 characters because of minLength property
    axios.get("/namesearch/" + query, axiosConfig).then((json) => {
      setOptions(json.data)
    })
  }, [])

  const handleInput = (input) => {
    // triggered when item selected from typeahead dropdown list
    if (input.length > 0) {
      props.onFightSelected(input[0].Name)
    }
  }

  return (
    <div className="row">
      <div className="col-md-6">
        <Card>
          <Card.Header className="bg-arbor text-white">
            {props.caption}
          </Card.Header>
          <Card.Body
            className="ag-theme-balham"
            style={{ height: "50px", marginBottom: "10px" }}
          >
            <AsyncTypeahead
              labelKey="Name"
              onSearch={handleSearch}
              onChange={handleInput}
              options={options}
              placeholder="Name 1..."
              caseSensitive={false}
              minLength={3}
              renderMenuItemChildren={(option, props, index) => (
                <div>
                  <span>{option.Name}</span>
                </div>
              )}
            />
          </Card.Body>
        </Card>
      </div>
      <div className="col-md-6">
        <Card>
          <Card.Header className="bg-arbor text-white">
            {props.caption}
          </Card.Header>
          <Card.Body
            className="ag-theme-balham"
            style={{ height: "50px", marginBottom: "10px" }}
          >
            <AsyncTypeahead
              labelKey="Name"
              onSearch={handleSearch}
              onChange={handleInput}
              options={options}
              placeholder="Name 2..."
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

export default FightSearch
