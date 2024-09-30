use actix_web::{web, App, HttpServer, Responder, HttpResponse};
use actix_cors::Cors;
use std::sync::Mutex;
use serde::{Deserialize, Serialize};

// Define the Task struct with an id
#[derive(Clone, Serialize, Deserialize, Debug)] // Added Debug here
struct Task {
    id: usize,
    task: String,
}

// Define a NewTask struct without id for incoming POST requests
#[derive(Deserialize, Debug)] // Added Debug here
struct NewTask {
    task: String,
}

// AppState will hold a Mutex for the task list
struct AppState {
    tasks: Mutex<Vec<Task>>,
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let app_state = web::Data::new(AppState {
        tasks: Mutex::new(Vec::new()),
    });

    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin("http://localhost:3000") // Allow frontend origin
            .allowed_methods(vec!["GET", "POST"])    // Allow GET and POST
            .allowed_headers(vec!["Content-Type"])
            .max_age(3600);

        App::new()
            .app_data(app_state.clone())
            .wrap(cors) // Enable CORS
            .route("/tasks", web::get().to(get_tasks)) // GET tasks route
            .route("/tasks", web::post().to(add_task)) // POST tasks route
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}

// Handler to get the list of tasks
async fn get_tasks(state: web::Data<AppState>) -> impl Responder {
    let tasks = state.tasks.lock().unwrap();
    web::Json(tasks.clone()) // Clone task list and return as JSON
}

// Handler to add a new task
async fn add_task(state: web::Data<AppState>, new_task: web::Json<NewTask>) -> impl Responder {
    let mut tasks = state.tasks.lock().unwrap();

    // Debug log to show the received task payload
    println!("Received new task: {:?}", new_task);

    // Generate a new ID based on the number of tasks
    let new_id = tasks.len() + 1;

    // Create a new task with the generated ID
    let task = Task {
        id: new_id,
        task: new_task.task.clone(),
    };

    // Add the new task to the task list
    tasks.push(task.clone());

    // Respond with the newly created task as JSON
    HttpResponse::Created().json(task) // Return 201 Created with the new task
}
