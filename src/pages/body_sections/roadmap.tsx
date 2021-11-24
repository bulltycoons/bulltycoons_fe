// import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

const roadMapContent = [
    {
        title: "Q3 2021",
        todos: [
            {
                contents: "Initial idea generation about the BullTycoons NFT",
                completed: true
            },
            {
                contents: "Team building and art designs",
                completed: true
            },
        ],
        bg: "#232323"/* "#800324" */,
        color: "#ffffff"
        
    },
    {
        title: "Q4 2021",
        todos: [
            {
                contents: "Smart contract and website development",
                completed: true
            },
            {
                contents: "Gleam competition to reward pioneering community members",
                completed: false
            },
            {
                contents: "Smart contract deployment to the Polygon network (to reduce gas fees) and website launch",
                completed: false
            },
            {
                contents: "First edition minting of the BullTycoons NFT & airdrop to the winners of the gleam competition",
                completed: false
            },
            {
                contents: "Opensea Integration",
                completed: false
            },
        ],
        bg: "#232323",
        color: "#ffffff"
    },
    {
        title: "Q1 2022",
        todos: [
            {
                contents: "Bull Fight Club Game development to reward BullTycoons NFT holders",
                completed: false
            },
            {
                contents: "Test release of the game to the community",
                completed: false
            },
            {
                contents: "Expansion of the BullTycoons community",
                completed: false
            }
        ],
        bg: "#232323"/* "#0acaf3" */,
        color:"#ffffff"
    }
]

const RoadmapSection = () => {

    return (
        <section id="roadmap" style={{padding:'5%', background:'#0004'}}>
            <div style={{marginBottom:'1em', textAlign:'center'}}>
                <h1 style={{color:"#fff"}}>Roadmap</h1>
            </div>
            <div style={{padding:'1em'}}>
                <Card.Group /* itemsPerRow={2} */ flex>
                    {(Object.values(roadMapContent).map((mapItem, index) => {
                        return (
                            <Card fluid style={{background:mapItem.bg, color:mapItem.color}}>
                                <Card.Content>
                                    <Card.Header style={{color:mapItem.color}}>{mapItem.title}</Card.Header>
                                    <div style={{height:'.5px', background:`${mapItem.color}55`, marginTop:'1em'}} />
                                    <div style={{textAlign:'left', padding:'1em'}}>
                                    {(Object.values(mapItem.todos).map((itemList, i) => {
                                        return (
                                            <div style={{flexDirection:'row', display:'flex', padding:'.5em'}}>
                                                {itemList.completed ? <Icon name="check" color="green" /> : <Icon name="minus" style={{color:`${mapItem.color}aa`}} />}
                                                <Card.Description style={{flex:1, marginLeft:'1em', fontSize:'medium'}}>{itemList.contents}</Card.Description>
                                            </div>
                                        )
                                    }))}
                                    </div>
                                </Card.Content>
                            </Card>
                        )
                    }))}
                </Card.Group>
            </div>
        </section>
    )
}

export default RoadmapSection;