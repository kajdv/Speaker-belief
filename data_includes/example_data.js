// This tells Ibex you will send the results early
var manualSendResults = true;
var showProgressBar = true;
var shuffleSequence = seq("consent","instructions",startsWith("Practice"),"scaleinstr","distract",randomize("experiment"),
                            "feedback","send","debriefing","final");
// rshuffle(startsWith("experiment")),rshuffle(startsWith("experiment"))
PennController.ResetPrefix(null);


// keyButton = function(id, text, wait){
//     let btn = newButton("btn"+id, text)
//             .print();
//     let selector = newSelector("sel"+id)
//                         .settings.add( getButton("btn"+id) )
//                         .settings.keys( " " );
//     if (wait)
//         selector = selector
//                         .wait( wait );
//     return [
//         btn
//         ,
//         selector
//     ];
// }

var items = [

    // ["setcounter", "__SetCounter__", { } ] // DO I NEED THIS?
    // ,    
    ["consent", "PennController", PennController(
        newHtml("consent", "SonaConsent.html")
            .settings.log()
            .print()
        ,
        // keyButton("consentBtn", "I consent to take this experiment",
        //     getHtml("consent").test.complete()
        //         .failure(
        //             getHtml("consent").warn(),
        //             getSelector("selconsentBtn").unselect()
        //         )
        // )
        newButton("consent btn", "I consent to take this experiment")
            .print()
            .wait( getHtml("consent").test.complete().failure( getHtml("consent").warn() ) )
    )]
    ,
    ["instructions", "PennController", PennController(
        newHtml("instructions form", "TaskInstructions-Sp-belief.html")
            .print()
        ,
        newButton("continue btn", "Click here to continue.")
            .print()
            .wait()
//            .wait( getHtml("instructions form").test.complete().failure(getHtml("instructions form").warn()) )
    )]
    ,
    ["scaleinstr", "PennController", PennController(
        newHtml("scale form", "Scale.html")
            .print()
        ,
        newButton("continue btn", "Continue.")  
            .print()
            .wait( getHtml("scale form").test.complete().failure(getHtml("scale form").warn()) )
    )]
    ,     
    ["distract", "PennController", PennController(
        newHtml("distract form", "DistractionsOff.html")
            .print()
        ,
        newButton("continue btn", "Continue.")
            .print()
            .wait( getHtml("distract form").test.complete().failure(getHtml("distract form").warn()) )
    )]
    ,
    ["feedback", "PennController", PennController(
        newHtml("feedback form", "SonaFeedback.html")
            .settings.log()
            .print()
        ,
        newButton("continue to confirm", "Click here to confirm your participation!")
            .settings.bold()
            .print()
            .wait()                
    )]
     ,
    ["send", "__SendResults__", {}]   
    , 
     ["debriefing", "PennController", PennController(
        newHtml("confirmation form", "IbexDebriefing.html")
             .print()
         ,
         newButton("continue to confirm", "Click to confirm that your answers went through.")
             .settings.bold()
             .print()
            .wait()
     )]                     
     , // Sona only
    ["final", "PennController", PennController(
          newText("final message", "The results were successfully sent to the server. Thanks!")
              .settings.bold()  
              .settings.center()
              .print()            
      )]
    
];

PennController.GetTable( "_table-datasource-however_Sp_bel.csv" ).setLabel("Expt");

PennController.FeedItems( PennController.GetTable( "_table-datasource-however_Sp_bel.csv" ).filter("Expt","experiment"),
    (item) => PennController(
        newTimer("blank", 1000)
            .start()
            .wait()
        ,    
        newTooltip("instructions", "Press Space to continue")
            .settings.size(180, 25)
            .settings.position("bottom center")
            .settings.key(" ", "no click")
        ,
        newCanvas("stimbox", 800, 180)
            .settings.add(25,40,
                newText("context", item.Background)
                    .settings.size(700, 30)
            ) 
            .settings.add(25, 85,
                newText("context", item.Says)
                    .settings.size(700, 30)
            )               
            .settings.add(25,125,
                newText("stimuli", item.Stims)
                    .settings.italic()
                    .settings.size(700, 30)                  
            )
            .print()
        ,
        newTimer("transit", 2000)
            .start()
            .wait()
        ,   
        newScale("answer", 9)
            .settings.log()
        ,
        newCanvas("answerbox", 800, 150)
         //   .settings.add(25,40, newText("prompt", item.Prompt).settings.size(700, 30).settings.bold() )   
            .settings.add(25,40, newText("claim", item.Claim).settings.size(700, 30) ) 
            .settings.add(25,95, newText("labelLeft", "No").settings.bold() )
            .settings.add(50,90, getScale("answer").settings.size(200, 0) )
            .settings.add(285,95, newText("labeRight", "Yes").settings.bold() )
            .settings.add(145,115, newText("labelMid", "Maybe").settings.bold() )            
            .print()   
        ,
        newText("warning","Please select a response.")
            .settings.hidden()
            .settings.color("red")
            .settings.bold()
            .settings.css("margin-left", 50 )
            .print()
        ,
        newButton("validate", "Next question.")
            .settings.center() 
            .print()    
            .wait(getScale("answer")
                  .test.selected()
                  .failure(getText("warning")
                           .settings.visible()
                          )
                 )        

    ).log("Expt", item.Expt)
    .log("ExptType", item.ExptType)
    .log("ItemName", item.ItemName)
    .log("Tense", item.Tense)
    .log("polarity", item.polarity)
    .log("EmbPred", item.EmbPred)
    .log("lemma", item.lemma)
    .log("Group", item.Group)
    .log("Item", item.Item)
    .log("NoExpt", item.NoExpt)
    .log("EmbCondition", item.EmbCondition)
    .log("Background", item.Background)
    .log("Prompt", item.Prompt)    
    .log("Stims", item.Stims)
    .log("Claim", item.Claim)
    .log("mcpred", item.mcpred)
);





