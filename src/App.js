import React from 'react'

import axios from 'axios'

class FillForm extends React.Component {
  state = {
    dish: '',
    ingredient1: '',
    ingredient2: '',
    ingredient3: ''
  };

  handleChange = (event) => {

    // const formData = { ...this.state, [event.target.name]: event.target.value }

    this.setState({ ...this.state, [event.target.name]: event.target.value  })
  
  }


handleSubmit = async (event) => {
  event.preventDefault()

const {dish, ingredient1, ingredient2, ingredient3} = this.state

console.log(dish, ingredient1)

// For later
// const query = `http://www.recipepuppy.com/api/?i=${ingredient1},${ingredient2}, ${ingredient3}&q=${dish}`


const query = `http://www.recipepuppy.com/api/?i=${ingredient1}&q=cake`

console.log(query)
  const response = await axios.get(query)

  console.log(response.data)

}




  render({ dish, ingredient1, ingredient2, ingredient3 } = this.state) {
  
    console.log(this.state)

    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <form
              onSubmit={this.handleSubmit}
              className="column is-half is-offset-one-quarter box"
            >
              <div className="field">
                <label className="label">Ingredient1</label>
                <div className="control">
                  <input
                    className="ingredient"
                    placeholder="Ingredient"
                    name="ingredient1"
                    onChange={this.handleChange}
                    value={ingredient1}
                  />
                </div>
              </div>
              


              <div className="field">
                <button
                  type="submit"
                  className="button is-fullwidth is-warning"
                >
                  INSPIRE ME!
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default FillForm
