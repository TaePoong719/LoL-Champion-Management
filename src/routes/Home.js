import { Component } from "../core/core";
import Headline from "../components/Headline";
import Search from "../components/Search";
import ChampionList from "../components/ChampionList";
import { initializeChampionList } from "../store/champion";
import championStore from "../store/champion";

export default class Home extends Component{
  render(){
    championStore.state.page = 1
    const headline = new Headline().el
    const search = new Search().el
    const championlist = new ChampionList().el
    this.el.classList.add('container')
    this.el.append(
      headline,
      search,
      championlist
      )
      
    initializeChampionList()
  }
}