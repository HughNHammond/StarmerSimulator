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
            1,
            speechDay1,
            {
                link: 2
            }
        ),

        new DialogueNode(
            player,
            "The Labour Party were elected because we promised change, and that is exactly what we will do: change Britain.",
            2,
            speechDay1,
            {
                response: [
                    {
                        r: "Talk about balancing the budget.",
                        goto:3,
                        italics: true
                    },
                ]
            }
        ),

        new DialogueNode(
            player,
            "The British economy has stagnated, and it is working people who are suffering. To grow, everyone must step up to the plate.",
            3,
            speechDay1,
            {
                link: 4
            }
        ),

        new DialogueNode(
            player,
            "Whenever the Conversatives announced cuts, I urged them to go further, and that's exactly what we will do. We need to force people to get back to work.",
            4,
            speechDay1,
            {
                link: 5
            }
        ),

        new DialogueNode(
            player,
            "Nothing has encouraged more laziness than our welfare system, particularly on Disability Benefits. That's why today I'm announcing our 'Get Up, Get Out' bill.",
            5,
            speechDay1,
            {
                link: 6
            }
        ),

        new DialogueNode(
            player,
            "I am announcing reform of the Disability Benefits, saving up to £7 billion each year, but I am not simply pocketing that money, I will use it to encourage disabled people back to work.",
            6,
            speechDay1,
            {
                link: 7
            }
        ),

        new DialogueNode(
            player,
            "The British Government has made a deal with Amazon warehouses for those seeking Disability Benefits to instead be offered a place on Amazon's new physiotherpay program.",
            7,
            speechDay1,
            {
                link: 8
            }
        ),

        new DialogueNode(
            player,
            "This program allows those out of work to get back into the workforce while undertaking a robust exercise regime that provides an intense all body workout.",
            8,
            speechDay1,
            {
                link: 9
            }
        ),

        new DialogueNode(
            player,
            "Participants will stretch key muscle groups by picking up deliveries, gain muscle mass walking around the warehouse at break-neck speeds - oof, sorry, I thought we cut that line.",
            9,
            speechDay1,
            {
                link: 10
            }
        ),

        new DialogueNode(
            player,
            "And, uh, oh yes – and develop their fine motor skills by aiming their urine into a bottle instead of wasting time on loo breaks.",
            10,
            speechDay1,
            {
                link: 11
            }
        ),
        new DialogueNode(
            player,
            "This program will only cost the British taxpayer £14 billion, and will grow our economy by bolstering and strengthening our workforce.",
            11,
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