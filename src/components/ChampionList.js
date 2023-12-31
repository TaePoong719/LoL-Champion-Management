import { Component } from "../core/core";
import championStore, { searchChampions} from "../store/champion";
import championItem from "./ChampionItem"

export default class ChampionList extends Component{
  constructor(){
    super()
    championStore.subscribe("champions",()=>{
      this.render()
    })
  }
  render(){
    this.el.classList.add('championlist')
    this.el.innerHTML = /* html */`
      <div class="champions"></div>
      <p class="champions-end"> </p>
    `
    const championsEl = this.el.querySelector('.champions')
    
    championsEl.append(
      ...championStore.state.champions.map(e => new championItem(e).el)     
    )
    
    // 무한스크롤 구현 
    const endEl = this.el.querySelector('.champions-end')
    const observer = new IntersectionObserver(entries=>{
      observerCb(entries)
    },{threshold:0.5})

    const observerCb = entries => {
      if(championStore.state.page*10 >= championStore.state.maxLength){
        observer.unobserve(endEl)
      }
      if(entries[0].isIntersecting){
        searchChampions(++championStore.state.page)
      }
    }

    if(championStore.state.storage.length>10){
      observer.observe(endEl)
    }

    // 이슈 발생 => 재랜더링시 관측요소가(.champions-end) 바로 보일정도로 디스플레이의 세로 길이가 길다면, 관측 요소가 나타나있음에도옵저버 콜백함수가 실행되지 않음
    // 랜더링 될 때마다, endEl 요소가 화면에 나타났을 경우 Observer Intersection 강제 실행할 수 있는 방법이 필요함

    // 새로운 이슈 발생 (2023-09-02) : 챔피언 리스트.js파일의 메모리 프리가 안되는 것 같음 뒤로가기 한번 할 때 마다 콘솔 로그가 찍히는게 하나씩 많아짐
  }
}