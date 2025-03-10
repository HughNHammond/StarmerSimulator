//Variables for each dialogue event (each one contains dialogueNodes and responseNodes)
let dialogueNodes = []
let testEvent = [];
let testEvent2 = [];
let testEvent3 = [];

let responseEvent1 = [];

let endStateEvent = [];

let pressEvent1 = [];

let podiumEvents = []
let speechDay1 = [];

//FUNCITON THAT CREATES DIALOGUE NODES AT RUN-TIME AND ASSIGNS THEM TO A POSITION IN EACH EVENT ARRAY

function createDialogueNodes() {


    speechDay1 = [
        new DialogueNode(
            player,
            "After 15 years of Conservative ruin, the British public elected a labour government for change.",
            0,
            speechDay1,
            {
                link: 1
            }
        ),

        new DialogueNode(
            player,
            "Our economy is broken. Changes were promsied, but never delivered. The contract between the people and government broken time and time again.",
            0,
            speechDay1,
            {
                link: null
            }
        )
    ]




    testEvent = [
    //NODES 0-19: TestNPC
        new DialogueNode(
            streeting, //speaker object
            "Hello, I'm the first " + streeting.name + ".", //string to display
            0, //ID for node
            testEvent,
            {
                link: 1,
            }
        ),

        new DialogueNode(
            streeting,
            "Here is some dialogue. This one changes my next node!",
            1,
            testEvent,
            {
                link: null,
            }
        ),
    ]

    testEvent2 = [
        new DialogueNode(
            streeting,
            "Oh, I have some new dialogue. Hey, who's that?",
            0,
            testEvent2,
            {
                link: null,
                func: activateNPC,
                param: reeves
            }
        )
    ]

    testEvent3 = [
        new DialogueNode(
            reeves,
            "I have nothing to say to you",
            0,
            testEvent3,
            {
                link: null
            }
        )
    ]

    responseEvent1 = [
        new DialogueNode(
            streeting,
            "How are you?",
            0,
            responseEvent1,
            {
                response: [
                    {r: "Yeah, I'm ok",
                        goto: 1 
                    },

                    {r: "I'm terrible.",
                        goto: 2
                    },
                    {r: "this is a third response",
                        goto: 1
                    },
                    {r: "and this is a fourht response",
                        goto: 1
                    }
                ]
            }
        ),

        new DialogueNode(
            streeting,
            "Yay, I'm so glad to hear that",
            1,
            responseEvent1,
            {
                link: null,
                func: setStartNode,
                param: [streeting, testEvent2]
            }
        ),

        new DialogueNode(
            streeting,
            "Oh no, that sucks!",
            2,
            responseEvent1,
            {
                link: 3,
            }
        ),

        new DialogueNode(
            streeting,
            "Have you considered being inexplicably transphobic?",
            3,
            responseEvent1,
            {
                response: [
                    {r: "Fuck off Wes [ENDS DIALOGUE]",
                        goto: null},
                    {r: "Fuck off Wes, but also I hate you [LINKS TO ANOTHER NODE]",
                        goto: 4}
                    ],
            }
        ),

        new DialogueNode(
            streeting,
            "Yeah, I've never known love.",
            4,
            responseEvent1,
            {
                link: null
            }
        )
    ]

    endStateEvent = [ 
        new DialogueNode (
            reeves,
            "Would you like to end the day?",
            0,
            endStateEvent,
            {
                response: [
                    {r: "Not quite yet.",
                        goto: 1 },
                    {r: "Yes please.",
                        goto: 2,
                        func: setTransition,
                        param: [startTransition, endDay] }
                ]
            },
        ),
    
        new DialogueNode (
            reeves,
            "Yes, we must grow more first.",
            1,
            endStateEvent,
            {
                link: null
            }
        ),

        new DialogueNode (
            reeves,
            "You never loved growth. You only pretened to.",
            2,
            endStateEvent,
            {
                link: null
            }
        )
    ]


    ///---PODIUM NODES---///


    // podiumEvents = [
    //     null, // to match indexes to day number

    //     pressEvent3 = [
    //         new DialogueNode(
    //             podium,
    //             "This is the opening dialogue to the podium.",
    //             0,
    //             pressEvent1,
    //             {
    //                 link: 1,
    //             }
    //         ),

    //         new DialogueNode(
    //             podium,
    //             "There should be info on your performance up there.",
    //             1,
    //             pressEvent1,
    //             {
    //                 link: null,
    //             }
    //         )
    //     ]
    // //  ]

    //     pressEvent1 = [
    //         new DialogueNode(
    //             podium,
    //             "Prime Minster! How do you respond to allegations that you are gay?",
    //             0,
    //             pressEvent1,
    //             {
    //                 response: [
    //                     {r: "I am not gay, Jeremy Corbyn is, however, very gay.",
    //                         goto: 0,
    //                         // func: player.modifyRating,
    //                         // param: [pressRating]
    //                     }
    //                 ]
    //             }
    //         )
    //     ]


    
}  



//DIALOGUE NODE CLASS
class DialogueNode {
    constructor(npc, text, dialogueID, dialogueEvent, info) {
        this.npc = npc; //sets speaker name
        this.text = text; //string containing dialogue
        //this.dialogueID = dialogueID; //index of dialogue
        this.dialogueEvent = dialogueEvent;

        this.info = info;

        dialogueEvent.push(this);
    }
}