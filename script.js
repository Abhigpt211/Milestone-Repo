// Function to show the add blog modal
function showAddBlogModal() {
    const modal = document.getElementById("add-blog-modal");
    modal.style.display = "block";
  }
  
  // Function to close the modal
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "none";
  }
  
  // Function to add a new blog
  function addBlog() {
    const title = document.getElementById("title").value;
    const posterInput = document.getElementById("poster");
    const description = document.getElementById("description").value;
    const content = document.getElementById("content").value;
  
    // Check if a file is selected
    if (posterInput.files.length === 0) {
      alert("Please select a poster image.");
      return;
    }
  
    // Get the selected image file
    const posterFile = posterInput.files[0];
  
    // Create the FileReader to read the image file
    const reader = new FileReader();
  
    // Define the event that will be triggered when the FileReader finishes loading
    reader.onload = function () {
      const poster = reader.result;
  
      // Create the blog object
      const blog = {
        title: title,
        poster: poster, // Save the image data (base64 encoded) instead of the file object
        description: description,
        content: content,
      };
  
      // Save the blog to LocalStorage
      const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
      blogs.push(blog);
      localStorage.setItem("blogs", JSON.stringify(blogs));
  
      // Close the add blog modal and refresh the blog list
      closeModal("add-blog-modal");
      displayBlogList();
    };
  
    // Read the selected image file as a data URL
    reader.readAsDataURL(posterFile);
  
    // Clear the file input value and preview
    posterInput.value = "";
    const previewDiv = document.getElementById("image-preview");
    previewDiv.innerHTML = "";
  }
  
  // Function to display the blog list on the home page
function displayBlogList() {
    const blogListDiv = document.getElementById("blog-list");
    blogListDiv.innerHTML = "";
  
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  
    blogs.forEach((blog, index) => {
      const blogDiv = document.createElement("div");
      blogDiv.classList.add("blog-item");
      blogDiv.innerHTML = `
        <img src="${blog.poster}" alt="Blog Poster" />
        <div class="blog-content">
          <h3>Blog Title: ${blog.title}</h3>
          <p>Blog description: ${blog.description}</p>
        </div>
      `;
      blogDiv.addEventListener("click", () => displayBlog(index));
      blogListDiv.appendChild(blogDiv);
    });
  }
  
  // Function to display a full blog post on a separate page (modal)
  function displayBlog(index) {
    const modal = document.getElementById("blog-page");
    const blog = JSON.parse(localStorage.getItem("blogs"))[index];
  
    document.getElementById("modal-title").textContent = blog.title;
    document.getElementById("modal-description").textContent = blog.description;
    document.getElementById("modal-content").innerHTML = `
      <p>Posted by: ${blog.poster}</p>
      <img src="${blog.poster}" alt="Blog Poster" />
      <p>${blog.content}</p>
    `;
  
    modal.style.display = "block";
  }
  
  // Function to display image preview
  function showImagePreview(input) {
    const previewDiv = document.getElementById("image-preview");
  
    if (input.files && input.files[0]) {
      const reader = new FileReader();
  
      reader.onload = function (e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        previewDiv.innerHTML = "";
        previewDiv.appendChild(img);
      };
  
      reader.readAsDataURL(input.files[0]);
    } else {
      previewDiv.innerHTML = "";
    }
  }
  
  // Event listeners
  document.getElementById("add-blog-button").addEventListener("click", showAddBlogModal);
  document.getElementById("add-blog-form").addEventListener("submit", (e) => {
    e.preventDefault();
    addBlog();
  });
  document.querySelectorAll(".close-button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const modalId = btn.parentElement.parentElement.id;
      closeModal(modalId);
    });
  });
  document.getElementById("poster").addEventListener("change", function () {
    showImagePreview(this);
  });
  
  // Initial setup on page load
  displayBlogList();