import React from "react";

import axios from "axios";

class FillForm extends React.Component {
  state = {
    dish: "",
    ingredient1: "",
    ingredient2: "",
    ingredient3: "",
  };

  handleChange = (event) => {
    // const formData = { ...this.state, [event.target.name]: event.target.value }

    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { dish, ingredient1, ingredient2, ingredient3 } = this.state;

    console.log(dish, ingredient1);

    // For later
    // const query = `http://www.recipepuppy.com/api/?i=${ingredient1},${ingredient2}, ${ingredient3}&q=${dish}`

    try {
      // API request to get list of recipes
      const res = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=00457b36e4884a15923e6cd91568706c&ingredients=${ingredient1}&number=2`)
      
      // Take out the id of each recipe
      const recipeIds =  res.data.map(recipe => recipe.id)

      console.log(res.data)
      console.log(recipeIds) // This works!

      const getSingleRecipe = async (id) => {  
        const res = await  axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=00457b36e4884a15923e6cd91568706c&includeNutrition=false`)

        return res.data
      }


      const recipeData = await Promise.all(recipeIds.map( id => getSingleRecipe(id)))
      // .then(recipeData => {
      //   // * recipe data is only avialble here in this block
      //   console.log(recipeData)
      // })

      console.log(recipeData)
  
      // // For each of the ids, fire another API request to another end point that returns the information that we actually need
      // const recipeData = await recipeIds.map(id => {

      //    axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=00457b36e4884a15923e6cd91568706c&includeNutrition=false`)
        
      //   // ! At the moment we only get promises

      // this.setState({recipeData}) // Store the results back in state
      

    } catch (err) {
      console.log(err)
    }


  };


  render({ dish, ingredient1, ingredient2, ingredient3 } = this.state) {
    console.log(this.state);

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
    );
  }
}

export default FillForm;
