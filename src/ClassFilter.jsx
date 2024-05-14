import React from "react"
import { Button, ButtonToolbar } from "react-bootstrap"

const ClassFilter = (props) => {
  const onClickSingleClass = (event) => {
    props.onClassFilterUpdated([event.target.value])
  }

  const onClickAllClasses = () => {
    props.onClassFilterUpdated(props.classes)
  }

  const buttons = props.classes.map(function (name, index) {
    return (
      <Button
        className="m-1"
        bg="outline-secondary"
        onClick={onClickSingleClass}
        key={index}
        size="sm"
        value={name}
      >
        {name}
      </Button>
    )
  })

  return (
    <div>
      <ButtonToolbar>
        <Button className="m-1" bg="info" onClick={onClickAllClasses} size="sm">
          Show all
        </Button>
        {buttons}
      </ButtonToolbar>
    </div>
  )
}

export default ClassFilter
