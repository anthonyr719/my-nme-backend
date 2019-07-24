const express  = require( 'express' );
const mongoose = require( 'mongoose' );
const Student  = require( './models/student.js' );
const Teacher  = require( './models/teacher' );

const app      = express();


app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Connect to Mongo!
mongoose.connect( 'mongodb://localhost/family_tree' );


// index
app.get( '/', ( req, res ) => {
    res.send("Welcome! go to /teachers")
});

// GET - get all teachers
app.get( '/teachers', ( req, res ) => {
    Teacher.find({}, function( err, teachers ){
        res.json(teachers);
    });
});

// GET - get one teacher
app.get('/teachers/:id', ( req, res ) => {
    // find one
    Teacher.findById(req.params.id
    , function( err, teacher ) {
        if( err ) res.json( err );
        res.json( teacher ); 
    })
});

// POST /widgets
app.post( '/teachers', ( req, res ) => {
    Teacher.create({
        name : req.body.name
    }, function( err, teacher ) {
        if( err ) res.json( err );
        console.log( teacher ); 
        res.redirect( '/teachers' ); 
    })
});

// DELETE
app.delete('/teachers/:id', ( req, res ) => {
    Teacher.findByIdAndRemove({
        _id : req.params.id
    }, function( err ) {
        if ( err ) res.json( err );
        res.redirect( '/teachers' ); 
    })
});

// PUT update teachers name
app.put( '/teachers/:id', ( req, res ) => {
    Teacher.findByIdAndUpdate({
        _id : req.params.id
    },
    {
        $set: {
            name : req.body.name
        }
    }, function( err, teacher ) {
        if ( err ) res.json( err );
        res.redirect( '/teachers' );
    })
});

// create student?
app.post( '/students', ( req, res ) => {
    Student.create({
        name : req.params.name, 
        meta : {
            major : req.params.majj 
        }
    }, function( err, student ) { 
        if( err ) res.json( err );
        res.redirect( '/' ); 
    })
});

// get one student 
app.get( '/student/:id', ( req, res ) => {
    Student.findById({
        name : req.params.id 
    }, function( err, student ) {
        if( err ) res.json( err );
        res.json( student ); 
    })
});

// delete student 
app.get( '/', ( req, res ) => {
    Student.deleteOne({
        name : req.params.name 
    }, function( err ) {
        if ( err ) res.json( err );
        res.redirect( '/' ); 
    })
});

var port = 3001;

app.listen( port, () => {

    console.log( "Hunting cobras on " + port );
});