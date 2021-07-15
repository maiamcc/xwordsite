///////////////////////////////////////////////////////////////
//                                                           //
//                    CONSTANT STATE                         //

// DECLARATION & INITIALIZATION of CONSTANTS

// button dimensions
BUTTON_WIDTH = 300;
BUTTON_HEIGHT = 175;
BUTTON_THIN_HEIGHT = 75;
BUTTON_THIN_WIDTH = 75;

// dancer dimensions
GENT_RADIUS = 70;
LADY_RADIUS = 55;

// physics and math
STARTING_SPEED = 8
MAX_SPEED = STARTING_SPEED;
pi = 3.14159265359;

// colors
var red = makeColor(1, 0, 0, 1);
var green = makeColor(0, 1, 0, 1);
var blue = makeColor(0, 0, 1, 1);
var purple = makeColor(0.5, 0.0, 1.0, 1.0);
var yellow = makeColor(0.5, 0.5, 0, 1)
var cyan = makeColor( 0, 0.5, 0.5, 1)
var white = makeColor(1, 1, 1, 1);
var black = makeColor(0, 0, 0, 1);

//POSITIONS and POSITION CONSTANTS
X_DIST = 180;
Y_DIST = 180;
Y_START = 250;
SET_CENTER = 2600;

position_a = new vec2( SET_CENTER / 2 - X_DIST/2, Y_START );
position_b = new vec2( SET_CENTER / 2 - X_DIST/2, Y_START + ( Y_DIST ) );
position_c = new vec2( SET_CENTER / 2 + X_DIST/2, Y_START + ( Y_DIST ) );
position_d = new vec2( SET_CENTER / 2 + X_DIST/2, Y_START );
position_e = new vec2( SET_CENTER / 2 - X_DIST/2, Y_START + ( 2 * Y_DIST ));
position_f = new vec2( SET_CENTER / 2 - X_DIST/2, Y_START + ( 3 * Y_DIST ) );
position_g = new vec2( SET_CENTER / 2 + X_DIST/2, Y_START + ( 3 * Y_DIST ) );
position_h = new vec2( SET_CENTER / 2 + X_DIST/2, Y_START + ( 2 * Y_DIST ));
position_i = new vec2( SET_CENTER / 2 - X_DIST/2, Y_START + ( 4 * Y_DIST ));
position_j = new vec2( SET_CENTER / 2 - X_DIST/2, Y_START + ( 5 * Y_DIST ) );
position_k = new vec2( SET_CENTER / 2 + X_DIST/2, Y_START + ( 5 * Y_DIST ) );
position_l = new vec2( SET_CENTER / 2 + X_DIST/2, Y_START + ( 4 * Y_DIST ));

///////////////////////////////////////////////////////////////
//                                                           //
//                     MUTABLE STATE                         //

// DECLARATION of VARIABLES

// where actions-to-be-excecuted are stored
var actionQueue = [];

// whether an action is currently going on
var actionInProgress = false;

// whether movement is linear or rotational (i.e. which set of movement rules to follow)
var linear = true;

// whether rotation is clockwise or counterclockwise
var clockwise = true;

// the left-side positions in order from top to bottom; used to put partners in order from top to bottom
var orderedPositions = [ position_a, position_b, position_e, position_f, position_i, position_j ]

///////////////////////////////////////////////////////////////
//                                                           //
//                      EVENT RULES                          //

// When setup happens...
function onSetup() {
    // INITIALIZATION of VARIABLES

// CREATING DANCERS, PARTNERS, HANDS FOUR
    
    ladyA = new Dancer( position_a, "lady", blue );
    gentA = new Dancer( position_d, "gent", blue );
    ladyB = new Dancer( position_c, "lady", purple );
    gentB = new Dancer( position_b, "gent", purple );
    handsFour_0 = makeHandsFour( ladyA, gentA, ladyB, gentB, 
        new vec2(position_a), new vec2(position_b), new vec2(position_c), new vec2(position_d) );
    partnersA = makePartners( ladyA, gentA, "1s" );
    partnersB = makePartners( ladyB, gentB, "2s" );

    ladyC = new Dancer( position_e, "lady", red );
    gentC = new Dancer( position_h, "gent", red );
    ladyD = new Dancer( position_g, "lady", green );
    gentD = new Dancer( position_f, "gent", green );
    handsFour_1 = makeHandsFour( ladyC, gentC, ladyD, gentD, 
        new vec2(position_e), new vec2(position_f), new vec2(position_g), new vec2(position_h) );
    partnersC = makePartners( ladyC, gentC, "1s" );
    partnersD = makePartners( ladyD, gentD, "2s" );

    ladyE = new Dancer( position_i, "lady", yellow );
    gentE = new Dancer( position_l, "gent", yellow );
    ladyF = new Dancer( position_k, "lady", cyan );
    gentF = new Dancer( position_j, "gent", cyan );
    handsFour_2 = makeHandsFour( ladyE, gentE, ladyF, gentF, 
        new vec2(position_i), new vec2(position_j), new vec2(position_k), new vec2(position_l) );
    partnersE = makePartners( ladyE, gentE, "1s" );
    partnersF = makePartners( ladyF, gentF, "2s" );

// BUTTONS

    //circle left
    button_cl1 = makeButton( 225, 50, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "1" )
    button_cl2 = makeButton( 325, 50, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "2" )
    button_cl3 = makeButton( 425, 50, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "3" )
    button_cl4 = makeButton( 525, 50, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "4" )

    //circle right
    button_cr1 = makeButton( 225, 150, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "1" )
    button_cr2 = makeButton( 325, 150, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "2" )
    button_cr3 = makeButton( 425, 150, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "3" )
    button_cr4 = makeButton( 525, 150, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "4" )

    //ladies alle
        // ladies alle left
        button_ladiesAlleL1 = makeButton( 325, 250, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "1" )
        button_ladiesAlleL2 = makeButton( 425, 250, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "2" )
        button_ladiesAlleL3 = makeButton( 525, 250, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "3" )

        //ladies alle right
        button_ladiesAlleR1 = makeButton( 325, 350, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "1" )
        button_ladiesAlleR2 = makeButton( 425, 350, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "2" )
        button_ladiesAlleR3 = makeButton( 525, 350, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "3" )   

    //gents alle
        //gents alle left
        button_gentsAlleL1 = makeButton( 325, 450, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "1" )
        button_gentsAlleL2 = makeButton( 425, 450, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "2" )
        button_gentsAlleL3 = makeButton( 525, 450, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "3" )

        //gents alle right
        button_gentsAlleR1 = makeButton( 325, 550, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "1" )
        button_gentsAlleR2 = makeButton( 425, 550, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "2" )
        button_gentsAlleR3 = makeButton( 525, 550, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "3" )

    //neighbors alle
        //neighbors alle left
        button_neighborsAlleL1 = makeButton( 325, 650, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "1" )
        button_neighborsAlleL2 = makeButton( 425, 650, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "2" )
        button_neighborsAlleL3 = makeButton( 525, 650, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "3" )

        //neighbors alle right
        button_neighborsAlleR1 = makeButton( 325, 750, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "1" )
        button_neighborsAlleR2 = makeButton( 425, 750, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "2" )
        button_neighborsAlleR3 = makeButton( 525, 750, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "3" )   

    //partners alle
        //partners alle left
        button_partnersAlleL1 = makeButton( 325, 850, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "1" )
        button_partnersAlleL2 = makeButton( 425, 850, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "2" )
        button_partnersAlleL3 = makeButton( 525, 850, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "3" )

        //partners alle right
        button_partnersAlleR1 = makeButton( 325, 950, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "1" )
        button_partnersAlleR2 = makeButton( 425, 950, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "2" )
        button_partnersAlleR3 = makeButton( 525, 950, BUTTON_THIN_HEIGHT, BUTTON_THIN_WIDTH, "3" )

    //swinging
    button_balSwingNeighbor = makeButton( 625, 50, BUTTON_THIN_HEIGHT, BUTTON_WIDTH, "B&S neighbor" )
    button_swingNeighbor = makeButton( 625, 150, BUTTON_THIN_HEIGHT, BUTTON_WIDTH, "Swing neighbor" )
    button_balSwingPartner = makeButton( 625, 250, BUTTON_THIN_HEIGHT, BUTTON_WIDTH, "B&S partner" )
    button_swingPartner = makeButton( 625, 350, BUTTON_THIN_HEIGHT, BUTTON_WIDTH, "Swing partner" )

    //chain & R/L through
    button_ladiesChain = makeButton( 625, 450, BUTTON_THIN_HEIGHT, BUTTON_WIDTH, "Ladies chain" )
    button_rightLeftThrough = makeButton( 625, 550, BUTTON_THIN_HEIGHT, BUTTON_WIDTH, "R/L through" )

    //long lines, pass through, progress
    button_longLines = makeButton( 625, 650, BUTTON_THIN_HEIGHT, BUTTON_WIDTH, "Long lines" )
    button_passThrough = makeButton( 625, 750, BUTTON_THIN_HEIGHT, BUTTON_WIDTH, "Pass through" )
    button_progress = makeButton( 625, 850, BUTTON_HEIGHT, BUTTON_WIDTH, "PROGRESS!" )

// arrays containing all dancers and all hands four
    dancers = [ladyA, gentA, ladyB, gentB, ladyC, gentC, ladyD, gentD, ladyE, gentE, ladyF, gentF];
        allDancers = [ladyA, gentA, ladyB, gentB, ladyC, gentC, ladyD, gentD, ladyE, gentE, ladyF, gentF];
    partners = [partnersA, partnersB, partnersC, partnersD, partnersE, partnersF];
        unorderedPartners = [partnersA, partnersB, partnersC, partnersD, partnersE, partnersF];
    allHandsFour = [handsFour_0, handsFour_1, handsFour_2 ];
    number1s = [partnersA, partnersC, partnersE];
    number2s = [partnersB, partnersD, partnersF];
}


// Called 30 times or more per second
function onTick() {
    simulate();
    render();
}


function render()  {
    clearScreen();

    // the band
    fillText("I'm the band!",
             SET_CENTER / 2, 
             50,             
             white, 
             "100px Times New Roman", 
             "center", 
             "middle");

    // the dancers  
    drawDancer( ladyA );
    drawDancer( gentA );
    drawDancer( ladyB );
    drawDancer( gentB );  
    drawDancer( ladyC );
    drawDancer( gentC );
    drawDancer( ladyD );
    drawDancer( gentD );
    drawDancer( ladyE );
    drawDancer( gentE );
    drawDancer( ladyF );
    drawDancer( gentF );


    // the buttons
    labelButton( button_cl1 , "Circle L:" );
        drawButton( button_cl1 );
        drawButton( button_cl2 );
        drawButton( button_cl3 );
        drawButton( button_cl4 );

    labelButton( button_cr1 , "Circle R:" );
        drawButton( button_cr1 );
        drawButton( button_cr2 );
        drawButton( button_cr3 );
        drawButton( button_cr4 );

    labelButton( button_ladiesAlleL1 , "Ladies alle. L:" );
        drawButton( button_ladiesAlleL1 );
        drawButton( button_ladiesAlleL2 );
        drawButton( button_ladiesAlleL3 );

    labelButton( button_ladiesAlleR1 , "Ladies alle. R:" );
        drawButton( button_ladiesAlleR1 );
        drawButton( button_ladiesAlleR2 );
        drawButton( button_ladiesAlleR3 );

    labelButton( button_gentsAlleL1 , "Gents alle. L:" );
        drawButton( button_gentsAlleL1 );
        drawButton( button_gentsAlleL2 );
        drawButton( button_gentsAlleL3 );

    labelButton( button_gentsAlleR1 , "Gents alle. R:" );
        drawButton( button_gentsAlleR1 );
        drawButton( button_gentsAlleR2 );
        drawButton( button_gentsAlleR3 );

    labelButton( button_neighborsAlleL1 , "Neighbors alle. L:" );
        drawButton( button_neighborsAlleL1 );
        drawButton( button_neighborsAlleL2 );
        drawButton( button_neighborsAlleL3 );

    labelButton( button_neighborsAlleR1 , "Neighbors alle. R:" );
        drawButton( button_neighborsAlleR1 );
        drawButton( button_neighborsAlleR2 );
        drawButton( button_neighborsAlleR3 );

    labelButton( button_partnersAlleL1 , "Partners alle. L:" );
        drawButton( button_partnersAlleL1 );
        drawButton( button_partnersAlleL2 );
        drawButton( button_partnersAlleL3 );

    labelButton( button_partnersAlleR1 , "Partners alle. R:" );
        drawButton( button_partnersAlleR1 );
        drawButton( button_partnersAlleR2 );
        drawButton( button_partnersAlleR3 );

    drawButton( button_swingNeighbor );
    drawButton( button_swingPartner );
    drawButton( button_balSwingNeighbor );
    drawButton( button_balSwingPartner );

    drawButton( button_ladiesChain );
    drawButton( button_rightLeftThrough );
    drawButton( button_longLines );
    drawButton( button_passThrough );
    drawButton( button_progress );
        button_progress.color = cyan;
}

function simulate() {

    // if any of the dancers are in motion, set actionInProgress = true
    actionInProgress = forAny( allDancers, inMotion );

    // process the queue
    if ( actionQueue.length > 0 && !(actionInProgress) ) {
       var thisAction = removeFront( actionQueue );
            thisAction();
    }

    // handles all movement
    for (var i=0;i<allDancers.length;i++) {        
        
        // if the dancer is not currently at its goal (i.e. pos != goal )...
        if ( inMotion( allDancers[i] ) ) {
                
            if( linear ){ 
                // LINEAR MOVEMENT                
                pathVec = sub( allDancers[i].goal, allDancers[i].pos );
                dirVec = direction( pathVec );
                moveVec = mul( dirVec, MAX_SPEED );
                
                // if max movement > distance to goal, then move less than max movement (i.e. straight to goal)
                if ( magnitude( pathVec ) < magnitude( moveVec ) ){
                    setPos( allDancers[i], allDancers[i].goal );
                } else { // otherwise, move toward goal at maximum speed
                    setPos( allDancers[i], add( allDancers[i].pos, moveVec ) );
                }
            } else {

                //POLAR MOVEMENT
                
                // get polar movement info
                polarDancer = getPolar( allDancers[i] )
                
                // clockwise vs. counterclockwise movement
                if( clockwise ){
                    MAX_RADIANS = MAX_SPEED/polarDancer.r;
                } else {
                    MAX_RADIANS = -1 * (MAX_SPEED/polarDancer.r);
                }

                // if max movement > distance to goal, then move less than max movement (i.e. straight to goal)                
                if( polarDancer.goalDist < abs( MAX_RADIANS ) ) {
                  theta_next = polarDancer.goalTheta;
                } else { // otherwise, move toward goal at maximum speed
                    theta_next = ( polarDancer.theta + MAX_RADIANS ) % ( 2*pi );
                }

                // change the position
                setPosX( allDancers[i], polarDancer.center.x + ( polarDancer.r * cos( theta_next ) ) );
                setPosY( allDancers[i], polarDancer.center.y + ( polarDancer.r * sin( theta_next ) ) );
            }
        }
    } 
}

// BUTTON FUNCTIONALITY
function onClick(x, y) {

    //circle left
    if (isButton ( x, y, button_cl1 )) {
        addToQueue( function() { circleLeftX( 1 ) } );
    } else if (isButton ( x, y, button_cl2 )) {
        addToQueue( function() { circleLeftX( 2 ) } );
    } else if (isButton ( x, y, button_cl3 )) {
        addToQueue( function() { circleLeftX( 3 ) } );
    } else if (isButton ( x, y, button_cl4 )) {
        addToQueue( function() { circleLeftX( 4 ) } );
    }   

    //circle right
    else if (isButton ( x, y, button_cr1 )) {
        addToQueue( function() { circleRightX( 1 ) } );
    } else if (isButton ( x, y, button_cr2 )) {
        addToQueue( function() { circleRightX( 2 ) } );
    } else if (isButton ( x, y, button_cr3 )) {
        addToQueue( function() { circleRightX( 3 ) } );
    } else if (isButton ( x, y, button_cr4 )) {
        addToQueue( function() { circleRightX( 4 ) } );
    }   

    //ladies alle L
    else if (isButton ( x, y, button_ladiesAlleL1 )) {
        addToQueue( function() { allemande( "ladies", "L", 0.5 ) } );
    } else if (isButton ( x, y, button_ladiesAlleL2 )) {
        addToQueue( function() { allemande( "ladies", "L", 1 ) } );
    } else if (isButton ( x, y, button_ladiesAlleL3 )) {
        addToQueue( function() { allemande( "ladies", "L", 1.5 ) } );
    }

    //ladies alle R
    else if (isButton ( x, y, button_ladiesAlleR1 )) {
        addToQueue( function() { allemande( "ladies", "R", 0.5 ) } );
    } else if (isButton ( x, y, button_ladiesAlleR2 )) {
        addToQueue( function() { allemande( "ladies", "R", 1 ) } );
    } else if (isButton ( x, y, button_ladiesAlleR3 )) {
        addToQueue( function() { allemande( "ladies", "R", 1.5 ) } );
    }

    //gents alle L
    else if (isButton ( x, y, button_gentsAlleL1 )) {
        addToQueue( function() { allemande( "gents", "L", 0.5 ) } );
    } else if (isButton ( x, y, button_gentsAlleL2 )) {
        addToQueue( function() { allemande( "gents", "L", 1 ) } );
    } else if (isButton ( x, y, button_gentsAlleL3 )) {
        addToQueue( function() { allemande( "gents", "L", 1.5 ) } );
    }    

    //gents alle R
    else if (isButton ( x, y, button_gentsAlleR1 )) {
        addToQueue( function() { allemande( "gents", "R", 0.5 ) } );
    } else if (isButton ( x, y, button_gentsAlleR2 )) {
        addToQueue( function() { allemande( "gents", "R", 1 ) } );
    } else if (isButton ( x, y, button_gentsAlleR3 )) {
        addToQueue( function() { allemande( "gents", "R", 1.5 ) } );
    }

    //neighbors alle L
    else if (isButton ( x, y, button_neighborsAlleL1 )) {
        addToQueue( function() { allemande( "neighbors", "L", 0.5 ) } );
    } else if (isButton ( x, y, button_neighborsAlleL2 )) {
        addToQueue( function() { allemande( "neighbors", "L", 1 ) } );
    } else if (isButton ( x, y, button_neighborsAlleL3 )) {
        addToQueue( function() { allemande( "neighbors", "L", 1.5 ) } );
    }    

    //neighbors alle R
    else if (isButton ( x, y, button_neighborsAlleR1 )) {
        addToQueue( function() { allemande( "neighbors", "R", 0.5 ) } );
    } else if (isButton ( x, y, button_neighborsAlleR2 )) {
        addToQueue( function() { allemande( "neighbors", "R", 1 ) } );
    } else if (isButton ( x, y, button_neighborsAlleR3 )) {
        addToQueue( function() { allemande( "neighbors", "R", 1.5 ) } );
    }

    //partners alle L
    else if (isButton ( x, y, button_partnersAlleL1 )) {
        addToQueue( function() { allemande( "partners", "L", 0.5 ) } );
    } else if (isButton ( x, y, button_partnersAlleL2 )) {
        addToQueue( function() { allemande( "partners", "L", 1 ) } );
    } else if (isButton ( x, y, button_partnersAlleL3 )) {
        addToQueue( function() { allemande( "partners", "L", 1.5 ) } );
    }    

    //partners alle R
    else if (isButton ( x, y, button_partnersAlleR1 )) {
        addToQueue( function() { allemande( "partners", "R", 0.5 ) } );
    } else if (isButton ( x, y, button_partnersAlleR2 )) {
        addToQueue( function() { allemande( "partners", "R", 1 ) } );
    } else if (isButton ( x, y, button_partnersAlleR3 )) {
        addToQueue( function() { allemande( "partners", "R", 1.5 ) } );
    }

    //swinging
    else if(isButton( x, y, button_swingNeighbor )) {
        addToQueue( swingNeighbor );
    } else if (isButton ( x, y, button_swingPartner )) {
        addToQueue( swingPartner );
    } else if (isButton ( x, y, button_balSwingNeighbor )) {
        addToQueue( balanceAndSwingNeighbor );
    } else if (isButton ( x, y, button_balSwingPartner )) {
        addToQueue( balanceAndSwingPartner );
    }

    // chain, r/l through, lines, pass through, progress
    else if (isButton ( x, y, button_ladiesChain )) {
        addToQueue( ladiesChain );
    } else if (isButton ( x, y, button_rightLeftThrough )) {
        addToQueue( rightLeftThrough );
    } else if (isButton ( x, y, button_longLines )) {
        addToQueue( longLines );
    } else if (isButton ( x, y, button_passThrough )) {
        addToQueue( swapOnSide );
    } else if (isButton ( x, y, button_progress )) {
        addToQueue( progress );
    }
}

// DANCE MOVE FUNCTIONS

// swing functions
    function swingNeighbor() {
        clockwise = true;
        var miniQueue = [];
        if ( ladyOnRight( allHandsFour[0].lady1, allHandsFour[0].gent2 ) ){
            var x = 4
        } else {
            var x = 5
        }
        insertBack( miniQueue, closeInNeighbors );

        for (var i=0; i<x; i++){
            insertBack( miniQueue, polarMovement );
            insertBack( miniQueue, swapNeighbors );
        }
        
        insertBack( miniQueue, linearMovement );
        insertBack( miniQueue, allToNearest );

        addSubQueue( miniQueue );
    }

    function swingPartner() {
        clockwise = true;
        var miniQueue = [];

        if ( ladyOnRight( allHandsFour[0].lady1, allHandsFour[0].gent1 ) ){
            var x = 4
        } else {
            var x = 5
        }
        insertBack( miniQueue, closeInPartners );

        for (var i=0; i<x; i++){
            insertBack( miniQueue, polarMovement );
            insertBack( miniQueue, swapPartners );
        }
        
        insertBack( miniQueue, linearMovement );
        insertBack( miniQueue, allToNearest );

        addSubQueue( miniQueue );
    }

// circle functions
    function circleLeftX( x ) {
        for (var i=0; i<x; i++){
            addToQueueFront( circleLeft1 );
        }
    }

    function circleRightX( x ) {
        for (var i=0; i<x; i++){
            addToQueueFront( circleRight1 );
        }
    }

    function circleLeft1() {
        linear = true;
        for (var i=0; i<dancers.length; i++) {
            var currentHandsFour = getHandsFour( dancers[i] );
            var currentIndex = getPos( dancers[i] );
            var goalIndex = ( currentIndex + 3 ) % 4;
            var goalPos = thisPos( goalIndex, currentHandsFour );
            setGoal( dancers[i], goalPos );
        }
    }

    function circleRight1() {
        linear = true;
        for (var i=0; i<dancers.length; i++) {
            var currentHandsFour = getHandsFour( dancers[i] );
            var currentIndex = getPos( dancers[i] );
            var goalIndex = ( currentIndex + 1 ) % 4;
            var goalPos = thisPos( goalIndex, currentHandsFour );
            setGoal( dancers[i], goalPos );
        }
    }

// allemande (equivalent to gypsy or do-si-do)
    // dancers = ladies, gents, neighbor, partner
    // dir = L or R
    // x = number of rotations. To get number of swaps, x*2
    function allemande( dancers, dir, x ){
        var miniQueue = [];
        var funcA;
        var funcB;
        if ( dancers == "ladies" ){
            funcA = closeInLadies;
            funcB = swapLadies;
        } else if ( dancers == "gents" ){
            funcA = closeInGents;
            funcB = swapGents;
        } else if ( dancers == "neighbors" ){
            funcA = closeInNeighbors;
            funcB = swapNeighbors;
        } else if ( dancers == "partners" ){
            funcA = closeInPartners;
            funcB = swapPartners;
        } else {
            alert( "invalid argument" );
        }

        if ( dir == "L" ){
            clockwise = false;
        } else if ( dir == "R" ){
            clockwise = true;
        } else {
            alert( "invalid direction" );
        }

        insertBack( miniQueue, funcA );

        for (var i=0; i<(2*x); i++){
            insertBack( miniQueue, polarMovement );
            insertBack( miniQueue, funcB );
        }
        
        insertBack( miniQueue, linearMovement );
        insertBack( miniQueue, allToNearest );

        addSubQueue( miniQueue );
    }


// chains and R/L through functions
    function ladiesChain(){
        var miniQueue = [];

        if ( ladyOnRightOnSide() ){
            linear = true;
            
            insertBack( miniQueue, closeInLadies );
            insertBack( miniQueue, swapLadies );
            insertBack( miniQueue, courtesySetup );
            
        } else {
            linear = true;
            insertBack( miniQueue, swapLadies );
        }
        
        insertBack( miniQueue, courtesyTurn );

        addSubQueue( miniQueue );
    }

    function rightLeftThrough(){
        addToQueueFront( courtesyTurn );
        addToQueueFront( swapAcross );
    }

    // courtesy turn functions
        function courtesyTurn(){
            clockwise = false;

            if( nextToPartner() ){
                addToQueueFront( allToNearest );
                addToQueueFront( linearMovement );
                addToQueueFront( swapPartners );
                addToQueueFront( polarMovement );
                addToQueueFront( closeInOnSide );
            } else {
                addToQueueFront( allToNearest );
                addToQueueFront( linearMovement );
                addToQueueFront( swapNeighbors );
                addToQueueFront( polarMovement );
                addToQueueFront( closeInOnSide );
            }
        }

        // courtesy turn auxillary functions
            function courtesySetup(){
                for(var h=0; h<allHandsFour.length; h++){
                    // send ladies one place to the left of the nearest spot
                    shiftLeft( allHandsFour[h].lady1 );
                    shiftLeft( allHandsFour[h].lady2 );
                    
                    // move gents one place to their left
                    setGoal( allHandsFour[h].gent1, thisPos( (getPos( allHandsFour[h].gent1 ) + 1)%4, allHandsFour[h] ) );
                    setGoal( allHandsFour[h].gent2, thisPos( (getPos( allHandsFour[h].gent2 ) + 1)%4, allHandsFour[h] ) );   
                }
            }

            function shiftLeft( dancer ){
                var currentHandsFour = getHandsFour( dancer );    
                newIndex = (nearestIndex( dancer ) + 3 ) % 4;
                newPos = thisPos( newIndex, currentHandsFour );
                setGoal( dancer, newPos );
            }

// long lines
    function longLines(){
        if ( nextToPartner() ){
            addToQueueFront( resetSpeed );
            addToQueueFront( allToNearest );
            addToQueueFront( closeInNeighbors );
            addToQueueFront( slowDown );
        } else {
            addToQueueFront( resetSpeed );
            addToQueueFront( allToNearest );
            addToQueueFront( closeInPartners );
            addToQueueFront( slowDown );
        }
    }

// progression
    function progress(){
        if ( progressedPlaces() ){
            allHandsFour = [];
            modifiedDancers = [];
            for ( var i=0; i<number1s.length; i++ ){
                if ( fuzzyEqual( number1s[i].lady.pos, position_j ) ){
                    outAtEnd( number1s[i] );
                } else {
                    nextPartners = getPartnersAhead( number1s[i] );
                        console.log( "next partners:")
                        console.log( nextPartners );
                    newHandsFour = partnersToHandsFour( number1s[i], nextPartners );
                    insertBack( allHandsFour, newHandsFour );

                    //modify array of dancers so it only includes dancers who are "in" (i.e. who are currently in a hands four)
                    insertBack( modifiedDancers, newHandsFour.lady1 );
                    insertBack( modifiedDancers, newHandsFour.gent1 );
                    insertBack( modifiedDancers, newHandsFour.lady2 );
                    insertBack( modifiedDancers, newHandsFour.gent2 );
                }
            }
            
            for ( var i=0; i<number2s.length; i++ ){
                if ( fuzzyEqual( number2s[i].gent.pos, position_a ) ){
                    outAtEnd( number2s[i] ); 
                }
            }  

        number1s = [];
        number2s = [];

        orderPartners();
        for ( var i=0; i<partners.length; i++ ){
            if ( partners[i].dirOfProg == "1s" ){
                insertBack( number1s, partners[i] );
            } else if ( partners[i].dirOfProg == "2s" ){
                insertBack( number2s, partners[i] );
            } else {
                alert( "help, I have no direction!")
            }
        }

        dancers = modifiedDancers;     

        } else {
            alert( "You can't progress from here!")
        }
    }

    function outAtEnd( partners ){
        swap( partners.lady, partners.gent );
        
        if ( partners.dirOfProg == "1s" ){
            partners.dirOfProg = "2s";
        } else {
            partners.dirOfProg = "1s";
        }
    }

// balancing functions
    function balanceNeighbors(){
        addToQueueFront( allToNearest );
        addToQueueFront( closeInNeighbors );
    }

    function balancePartners(){
        addToQueueFront( allToNearest );
        addToQueueFront( closeInNeighbors );
    }

    function balanceAndSwingNeighbor(){
        addToQueueFront( swingNeighbor );
        addToQueueFront( balanceNeighbors );
    }

    function balanceAndSwingPartner(){
        addToQueueFront( balancePartners );
        addToQueueFront( swingPartner );
    }

// swap functions
    function swap( dancerA, dancerB ){
        setGoal( dancerA, dancerB.pos );
        setGoal( dancerB, dancerA.pos );
    }

    function swapNeighbors(){
        for(var h=0; h<allHandsFour.length; h++){
            swap( allHandsFour[h].lady1, allHandsFour[h].gent2 );
            swap( allHandsFour[h].lady2, allHandsFour[h].gent1 );
        }
    }

    function swapPartners(){
        for(var h=0; h<allHandsFour.length; h++){
            swap( allHandsFour[h].lady1, allHandsFour[h].gent1 );
            swap( allHandsFour[h].lady2, allHandsFour[h].gent2 );
        }
    }

    function swapLadies(){
        for(var h=0; h<allHandsFour.length; h++){
            swap( allHandsFour[h].lady1, allHandsFour[h].lady2 );
        }
    }

    function swapGents(){
        for(var h=0; h<allHandsFour.length; h++){
            swap( allHandsFour[h].gent1, allHandsFour[h].gent2 );
        }
    }
    function swapOnSide( ){
        for(var h=0; h<allHandsFour.length; h++){
            if( nextToPartner() ){
                swap( allHandsFour[h].lady1, allHandsFour[h].gent1 );
                swap( allHandsFour[h].lady2, allHandsFour[h].gent2 );    
            } else {
                swap( allHandsFour[h].lady1, allHandsFour[h].gent2 );
                swap( allHandsFour[h].lady2, allHandsFour[h].gent1 );    
            }
        }
    }

    function swapAcross(){
        for(var h=0; h<allHandsFour.length; h++){
            swap( dancerAtPos( 0, allHandsFour[h] ), dancerAtPos( 3, allHandsFour[h] ) );
            swap( dancerAtPos( 1, allHandsFour[h] ), dancerAtPos( 2, allHandsFour[h] ) );
        }
    }



// close in functions (move dancers towards the midpoint between them)
    function closeIn( dancerA, dancerB, x ){
        // for a swing, x = 5; for ladies alle, x = 3, for gents, x = 4
        pathVec = sub( dancerB.pos, dancerA.pos );
        totalDist = magnitude( pathVec );
        moveDist = totalDist/x;
        dirVec = direction( pathVec );
        moveVec = mul( moveDist, dirVec );
        setGoal( dancerA, add( dancerA.pos, moveVec ) );
        setGoal( dancerB, sub( dancerB.pos, moveVec ) );
    }

    function closeInLadies(){
        for(var h=0; h<allHandsFour.length; h++){
            closeIn( allHandsFour[h].lady1, allHandsFour[h].lady2, 3 );
        }
    }

    function closeInGents(){
        for(var h=0; h<allHandsFour.length; h++){
            closeIn( allHandsFour[h].gent1, allHandsFour[h].gent2, 4 )
        }
    }

    function closeInNeighbors(){
        for(var h=0; h<allHandsFour.length; h++){
            closeIn( allHandsFour[h].lady1, allHandsFour[h].gent2, 5 );
            closeIn( allHandsFour[h].lady2, allHandsFour[h].gent1, 5 );
        }
    }

    function closeInPartners(){
        for(var h=0; h<allHandsFour.length; h++){
            closeIn( allHandsFour[h].lady1, allHandsFour[h].gent1, 5 );
            closeIn( allHandsFour[h].lady2, allHandsFour[h].gent2, 5 ); 
        }   
    }

    function closeInOnSide(){
        for(var h=0; h<allHandsFour.length; h++){
            closeIn( dancerAtPos(0, allHandsFour[h]), dancerAtPos(1, allHandsFour[h]), 6 );
            closeIn( dancerAtPos(2, allHandsFour[h]), dancerAtPos(3, allHandsFour[h]), 6 );    
        }
    }

// nearest pos. functions
    function nearestIndex( dancer ){
        var currentHandsFour = getHandsFour( dancer );
        dist0 = distToPos( dancer, currentHandsFour.POS_0 );
        dist1 = distToPos( dancer, currentHandsFour.POS_1 );
        dist2 = distToPos( dancer, currentHandsFour.POS_2 );
        dist3 = distToPos( dancer, currentHandsFour.POS_3 );
        var distances = [ dist0, dist1, dist2, dist3 ];
        minDist = getMin( distances );
        index = indexOf( distances, minDist );
        return index;
    }

    function toNearestPos( dancer ){
        var currentHandsFour = getHandsFour( dancer );
        var index = nearestIndex( dancer, currentHandsFour )
        nearestPos = thisPos( index, currentHandsFour );
        setGoal( dancer, nearestPos );
    }

    function allToNearest(){
        for (var i=0;i<dancers.length;i++) {
            toNearestPos( dancers[i], getHandsFour( dancers[i] ) );
        }
    }

///////////////////////////////////////////////////////////////
//                                                           //
//                      HELPER RULES                         //

// GUI, DRAWING, BUTTON-HANDLING
    
    // making objects
        function Dancer( pos, gender, color ){
            this.pos = new vec2( pos );
            if ( gender == "lady"){
                this.radius = LADY_RADIUS;    
            } else if ( gender == "gent"){
                this.radius = GENT_RADIUS;    
            } else {
                alert( "invalid gender" );
            } 
            this.color = color;
            this.goal = new vec2( this.pos );
            this.start = new vec2( this.pos );
        }

        function makePartners( l, g, dir ){
            return { lady : l, gent : g, dirOfProg : dir }
        }

        function makeHandsFour( l1, g1, l2, g2, p0, p1, p2, p3 ){
            return { lady1 : l1, gent1 : g1, lady2 : l2, gent2 : g2,
                POS_0 : p0, POS_1 : p1, POS_2 : p2, POS_3 : p3 }
        }

        function partnersToHandsFour( partners1, partners2 ){
            thisHandsFour = makeHandsFour( partners1.lady, partners1.gent, partners2.lady, partners2.gent,
                new vec2( partners1.lady.pos ), new vec2( partners2.gent.pos ),
                new vec2( partners2.lady.pos ), new vec2( partners1.gent.pos ) );
            return thisHandsFour;
        }

        function makeButton( x, y, h, w, text ){
            return { x : x, y : y, h : h, w : w, color : green, text : text }
        }

    // modifying objects

        // set position of a dancer
        function setPos(dancer, pos) {
            dancer.pos = new vec2(pos)
        }

        // set position.x of a dancer
        function setPosX( dancer, posX ) {
            dancer.pos = new vec2( posX, dancer.pos.y )
        }

        // set position.y of a dancer
        function setPosY( dancer, posY ) {
            dancer.pos = new vec2( dancer.pos.x, posY )
        }

        // set goal of a dancer
        function setGoal(dancer, pos) {
            dancer.goal = new vec2(pos)
        }

    // drawing objects

        // make a dancer
        function drawDancer( dancer ) {
            fillCircle( dancer.pos.x, dancer.pos.y, dancer.radius, dancer.color );
        }

        // make a button
        function drawButton( button ) {
            fillRectangle( button.x, button.y, button.w, button.h, button.color );
            fillText( button.text,
                button.x + button.w/2,
                button.y + button.h/2,
                black,
                "40px Times New Roman",
                "center",
                "middle")
        }

        // make a left-aligned label for a row of buttons
        function labelButton( button, text ){
            fillText( text,
                0, 
                button.y + button.h/2,         
                green,
                "40px Times New Roman",
                "start",
                "middle");
        }

    // button-handling
        // returns true if given (x,y) coordinates are within the given button
        function isButton( x, y, button ) {
            return x > button.x && x < button.x + button.w && y > button.y && y < button.y + button.h;
        }

    // action-processing

        // returns true if a given dancer is in motion
        function inMotion( dancer ){
            return (!(fuzzyEqual( dancer.goal, dancer.pos )));
        }

        // adds event to back of action queue
        function addToQueue( move ){
            insertBack( actionQueue, move )
        }

        // adds event to front of action queue (used when queuing functions withing a larger event)
        function addToQueueFront( move ){
            insertFront( actionQueue, move )
        }

        // transfers contents of a function array into the action queue, preserving their order
        function addSubQueue( functArray ){
            for ( var i=0; i<functArray.length; i++ ){
                addToQueue( functArray[i] );
            }
        }

// MATH & LOGIC

    // determine if two vectors are more or less equal
    function fuzzyEqual( v0, v1 ) {
        difference = sub( v0, v1 );
        return dot( difference, difference ) <= 0.000001;
    }

    // returns true if any elements of the array meet the condition
    function forAny( stuff, conditional ){
        var condition = false;
        stuff.forEach( function( x ) { 
                            if( conditional( x ) ) { 
                                condition = true 
                            } 
                        } )
        return condition;
    }

    // dancer's distance from a given position
    function distToPos( dancer, pos ){
        pathVec = sub( dancer.pos, pos );
        totalDist = magnitude( pathVec );
        return totalDist;
    }

    // returns the minimum numerical value from an array
    function getMin( stuff ){
        var minimum = stuff[0]
        for( var i=1; i<stuff.length; i++ ){
            if( stuff[i] < minimum ){
                minimum = stuff[i];
            }
        }
        return minimum;
    }

    // makes a positive angle out of a given angle (in radians)
    function positiveAngle( x ) {
        if ( x < 0 ) {
            x = ( x + ( 2 * pi ) ) % ( 2*pi )
        }
        return x;
    }

    // the state of the dance floor
        
        // returns true if lady is on the right of a given lady/gent pair
        function ladyOnRight( lady, gent ){
            return getPos( lady ) == ( getPos( gent ) + 1 ) % 4
        }

        // returns true if the lady is on the right of the lady/gent pair on the side of the set
        function ladyOnRightOnSide(){
            return !( fuzzyEqual( allHandsFour[0].lady1.pos, allHandsFour[0].POS_0 ) || fuzzyEqual( allHandsFour[0].lady2.pos, allHandsFour[0].POS_0) );
        }

        // returns true if partners are next to each other on the side of the set 
        function nextToPartner(){
            lady1Pos = getPos( allHandsFour[0].lady1 );
            gent1Pos = getPos( allHandsFour[0].gent1 );

            if ( ladyOnRightOnSide() ){
                return ( lady1Pos == gent1Pos + 1 );
            } else {
                return ( lady1Pos + 1 == gent1Pos );
            }
        }

        // checks to see if the dancers are in the right positions to progress
        function progressedPlaces(){
            if ( fuzzyEqual( allHandsFour[0].lady1.pos, allHandsFour[0].POS_1 ) &&
                    fuzzyEqual( allHandsFour[0].lady2.pos, allHandsFour[0].POS_3 ) &&
                    fuzzyEqual( allHandsFour[0].gent1.pos, allHandsFour[0].POS_2 ) &&
                    fuzzyEqual( allHandsFour[0].gent2.pos, allHandsFour[0].POS_0 ) ){
                        return true;
            } else {
                return false;
            }
        }

    // physics and motion
        
        // creates an object containing all necessary information for polar (i.e. rotational) movement
        function getPolar( dancer ) {
            difVec = sub( dancer.goal, dancer.start );
            halfDifVec = div( difVec, 2 );
            polarCoord = new Object();
                polarCoord.center = add( dancer.start, halfDifVec );
                polarCoord.relativePos = sub( dancer.pos, polarCoord.center );
                polarCoord.relativeGoal = sub( dancer.goal, polarCoord.center );
                polarCoord.r = magnitude( sub( dancer.start, polarCoord.center ) );
                polarCoord.theta = atan2( polarCoord.relativePos.y, polarCoord.relativePos.x );
                polarCoord.goalTheta = atan2( polarCoord.relativeGoal.y, polarCoord.relativeGoal.x );
                polarCoord.goalDist = positiveAngle( positiveAngle( polarCoord.goalTheta ) - positiveAngle( polarCoord.theta ) );
            return polarCoord;
        }

        // switches system into polar movement
        function polarMovement() {
            linear = false;
            for (var i=0; i<dancers.length; i++) {
                dancers[i].start = new vec2( dancers[i].pos );
            }
        }

        // switches system into linear movement
        function linearMovement() {
            linear = true;
        }

        // decreases speed of movement
        function slowDown(){
            if ( MAX_SPEED > 7 ){
                MAX_SPEED = MAX_SPEED - 5;
            } else {
                MAX_SPEED = 2;
            }
        }

        // resets speed to original speed
        function resetSpeed(){
            MAX_SPEED = STARTING_SPEED;
        }

// INFO ABOUT OBJECTS (hands four, partners, positions, etc.)
    
    // returns hands four of a given dancer
    function getHandsFour( dancer ){
        for (var h=0; h<allHandsFour.length; h++){
            if ( allHandsFour[h].lady1 == dancer ||
                    allHandsFour[h].gent1 == dancer || 
                    allHandsFour[h].lady2 == dancer || 
                    allHandsFour[h].gent2 == dancer ) {
                return allHandsFour[h];
            }
        }
    }

    // given a dancer, returns the partners object to which that dancer belongs
    function getPartners( dancer ){
        for (var i=0; i<partners.length; i++){
            if ( unorderedPartners[i].lady == dancer || unorderedPartners[i].gent == dancer ){
                return unorderedPartners[i];
            }
        }
    }

    // returns the partners pair below a given set of partners
    function getPartnersAhead( partners ){
        posOfNext = new vec2( partners.lady.pos.x, partners.lady.pos.y + Y_DIST );
            console.log(posOfNext)
        dancerAtNext = dancerAtCoordinates( posOfNext );
            console.log(dancerAtNext)
        nextPartners = getPartners( dancerAtNext );
            console.log(nextPartners)
        return nextPartners;
    }

    // orders the array "partners" from top to bottom
    function orderPartners(){
        for (var i=0; i<orderedPositions.length; i++){
            thisDancer = dancerAtCoordinates( orderedPositions[i] );
            thesePartners = getPartners( thisDancer );
            partners[i] = thesePartners;
        }
    }

    // DANCER POSIITONS
        
        // return the index # of a dancer's position, if dancer is in one of the four numbered positions
        function getPos( dancer ) {
            var currentHandsFour = getHandsFour( dancer );
            if ( fuzzyEqual( dancer.pos, currentHandsFour.POS_0 )) {
                return 0;
            } else if ( fuzzyEqual( dancer.pos, currentHandsFour.POS_1 )) {
                return 1;
            } else if ( fuzzyEqual( dancer.pos, currentHandsFour.POS_2 )) {
                return 2;
            } else if ( fuzzyEqual( dancer.pos, currentHandsFour.POS_3 )) {
                return 3;
            } else {
                return null;
            }
        }

        // turns an index number into a position
        function thisPos( z, handsFour ) {
            if ( z == 0 ) {
                return new vec2( handsFour.POS_0 );
            } else if ( z == 1 ){
                return new vec2( handsFour.POS_1 );
            } else if ( z == 2 ){
                return new vec2( handsFour.POS_2 );
            } else if ( z == 3 ){
                return new vec2( handsFour.POS_3 );
            } else {
                alert( "nonexistant position")
            }
        }

        // returns the dancer at a given position (of the predefined positions)
        function dancerAtPos( x, handsFour ){
            if ( fuzzyEqual( handsFour.lady1.pos, thisPos( x, handsFour) ) ){
                return handsFour.lady1;
            } else if ( fuzzyEqual( handsFour.lady2.pos, thisPos( x, handsFour) ) ){
                return handsFour.lady2;
            } else if ( fuzzyEqual( handsFour.gent1.pos, thisPos( x, handsFour) ) ){
                return handsFour.gent1;
            } else if ( fuzzyEqual( handsFour.gent2.pos, thisPos( x, handsFour) ) ){
                return handsFour.gent2;
            }
        }  

        // returns the dancer at a given position ( ANY position, not just the 4 positions of a hands four )
        function dancerAtCoordinates( pos ){
            for (var i=0; i<allDancers.length; i++){
                if ( fuzzyEqual( allDancers[i].pos, pos ) ){
                    return allDancers[i];
                }
            }
        }