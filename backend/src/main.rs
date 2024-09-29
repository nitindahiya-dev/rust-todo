use actix_web::{web, App, HttpServer, Responder, HttpResponse};
use actix_cors::Cors;
use std::sync::Mutex;
use serde::{Deserialize, Serialize};

// Define the Task struct
#[derive(Clone, Serialize, Deserialize, Debug)] // Added Debug here
struct Task {
    id: usize,
    task: String,
}

// The app state will hold a Mutex for safe concurrent access
struct AppState {
    tasks: Mutex<Vec<Task>>,
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Initialize the app state with an empty task list
    let app_state = web::Data::new(AppState {
        tasks: Mutex::new(Vec::new()),
    });

    // Start the HTTP server
    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin("http://localhost:3000") // Allow requests from your frontend
            .allowed_methods(vec!["GET", "POST"]) // Allow GET and POST methods
            .allowed_headers(vec!["Content-Type"])
            .max_age(3600);

        App::new()
            .app_data(app_state.clone())
            .wrap(cors) // Enable CORS middleware
            .route("/tasks", web::get().to(get_tasks))
            .route("/tasks", web::post().to(add_task))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}

// Handler to get the list of tasks
async fn get_tasks(state: web::Data<AppState>) -> impl Responder {
    let tasks = state.tasks.lock().unwrap();
    web::Json(tasks.clone()) // Clone the task list and return as JSON
}

// Handler to add a new task
async fn add_task(state: web::Data<AppState>, task: web::Json<Task>) -> impl Responder {
    let mut tasks = state.tasks.lock().unwrap();

    // Generate a new ID based on the length of the task list
    let new_id = tasks.len() + 1;

    // Create a new task
    let new_task = Task {
        id: new_id,
        task: task.task.clone(), // Use .clone() to avoid moving the task out
    };

    // Push the new task to the list
    tasks.push(new_task.clone());

    // Log the new task (optional)
    println!("Added task: {:?}", new_task); // Now it will work without errors

    // Return a response with the newly created task
    HttpResponse::Created().json(new_task) // Return 201 Created with the new task as JSON
}
