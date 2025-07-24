document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navLinks = document.querySelectorAll('.sidebar a');
    const contentSections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Update active nav link
            navLinks.forEach(navLink => navLink.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');
            
            // Show target section
            contentSections.forEach(section => section.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Tab functionality for settings
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show target tab content
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Modal functionality
    const modals = document.querySelectorAll('.modal');
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('.close-btn, .close-modal');
    
    function openModal(modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    openModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal-target');
            const modal = document.getElementById(modalId);
            openModal(modal);
        });
    });
    
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // Student search functionality
    const searchStudentBtn = document.getElementById('search-student');
    const studentIdInput = document.getElementById('student-id');
    const studentInfoSection = document.getElementById('student-info');
    
    searchStudentBtn.addEventListener('click', function() {
        const studentId = studentIdInput.value.trim();
        
        if (studentId === '') {
            alert('Please enter a student ID or matric number');
            return;
        }
        
        // Simulate API call (will be replaced with actual AJAX call)
        simulateStudentSearch(studentId);
    });
    
    function simulateStudentSearch(studentId) {
        // Show loading state
        searchStudentBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
        searchStudentBtn.disabled = true;
        
        // Simulate API delay
        setTimeout(() => {
            // Sample data - in real app, this would come from backend
            const sampleStudent = {
                id: studentId,
                name: 'Adeola Johnson',
                matric: studentId,
                department: 'Statistics',
                program: 'BSc',
                admissionYear: '2018',
                graduationYear: '2022',
                courses: [
                    { code: 'STA 101', title: 'Introduction to Statistics', credit: 3, grade: 'A', session: '2018/2019', semester: 'First' },
                    { code: 'STA 102', title: 'Probability Theory', credit: 3, grade: 'B', session: '2018/2019', semester: 'First' },
                    { code: 'STA 201', title: 'Statistical Inference', credit: 3, grade: 'A', session: '2019/2020', semester: 'First' },
                    { code: 'STA 202', title: 'Regression Analysis', credit: 3, grade: 'A', session: '2019/2020', semester: 'Second' },
                    { code: 'STA 301', title: 'Multivariate Analysis', credit: 3, grade: 'B', session: '2020/2021', semester: 'First' },
                    { code: 'STA 302', title: 'Time Series Analysis', credit: 3, grade: 'A', session: '2020/2021', semester: 'Second' },
                    { code: 'STA 401', title: 'Research Project', credit: 6, grade: 'A', session: '2021/2022', semester: 'First' }
                ]
            };
            
            // Populate student info
            document.getElementById('student-name').textContent = sampleStudent.name;
            document.getElementById('student-matric').textContent = sampleStudent.matric;
            document.getElementById('student-dept').textContent = sampleStudent.department;
            document.getElementById('student-program').textContent = sampleStudent.program;
            document.getElementById('student-admission-year').textContent = sampleStudent.admissionYear;
            document.getElementById('student-graduation-year').textContent = sampleStudent.graduationYear;
            
            // Populate courses table
            const tbody = document.querySelector('#grades-table tbody');
            tbody.innerHTML = '';
            
            sampleStudent.courses.forEach(course => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${course.code}</td>
                    <td>${course.title}</td>
                    <td>${course.credit}</td>
                    <td>${course.grade}</td>
                    <td>${course.session}</td>
                    <td>${course.semester}</td>
                `;
                tbody.appendChild(row);
            });
            
            // Show student info section
            studentInfoSection.style.display = 'block';
            
            // Reset search button
            searchStudentBtn.innerHTML = '<i class="fas fa-search"></i> Search';
            searchStudentBtn.disabled = false;
        }, 1000);
    }

    // Generate PDF button
    const generatePdfBtn = document.getElementById('generate-pdf');
    const previewTranscriptBtn = document.getElementById('preview-transcript');
    
    generatePdfBtn.addEventListener('click', function() {
        alert('This would generate a PDF transcript in a real application');
        // In a real app, this would call the backend to generate a PDF
    });
    
    previewTranscriptBtn.addEventListener('click', function() {
        const studentId = studentIdInput.value.trim();
        
        if (studentId === '') {
            alert('Please search for a student first');
            return;
        }
        
        // Show loading state
        previewTranscriptBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating Preview...';
        previewTranscriptBtn.disabled = true;
        
        // Simulate API delay
        setTimeout(() => {
            generateTranscriptPreview(studentId);
            
            // Reset button
            previewTranscriptBtn.innerHTML = '<i class="fas fa-eye"></i> Preview Transcript';
            previewTranscriptBtn.disabled = false;
            
            // Open preview modal
            openModal(document.getElementById('preview-modal'));
        }, 1500);
    });
    
    function generateTranscriptPreview(studentId) {
        const previewContainer = document.getElementById('transcript-preview');
        
        // Sample data - in real app, this would come from backend
        const sampleStudent = {
            name: 'Adeola Johnson',
            matric: studentId,
            department: 'Statistics',
            program: 'BSc Statistics',
            admissionYear: '2018',
            graduationYear: '2022',
            dob: '15th March, 2000',
            state: 'Oyo',
            country: 'Nigeria',
            courses: [
                { code: 'STA 101', title: 'Introduction to Statistics', credit: 3, grade: 'A', point: 5.0, session: '2018/2019', semester: 'First' },
                { code: 'STA 102', title: 'Probability Theory', credit: 3, grade: 'B', point: 4.0, session: '2018/2019', semester: 'First' },
                { code: 'MAT 101', title: 'General Mathematics I', credit: 3, grade: 'A', point: 5.0, session: '2018/2019', semester: 'First' },
                { code: 'CSC 101', title: 'Introduction to Computer Science', credit: 2, grade: 'A', point: 5.0, session: '2018/2019', semester: 'First' },
                { code: 'STA 201', title: 'Statistical Inference', credit: 3, grade: 'A', point: 5.0, session: '2019/2020', semester: 'First' },
                { code: 'STA 202', title: 'Regression Analysis', credit: 3, grade: 'A', point: 5.0, session: '2019/2020', semester: 'Second' },
                { code: 'STA 301', title: 'Multivariate Analysis', credit: 3, grade: 'B', point: 4.0, session: '2020/2021', semester: 'First' },
                { code: 'STA 302', title: 'Time Series Analysis', credit: 3, grade: 'A', point: 5.0, session: '2020/2021', semester: 'Second' },
                { code: 'STA 401', title: 'Research Project', credit: 6, grade: 'A', point: 5.0, session: '2021/2022', semester: 'First' }
            ],
            cgpa: 4.72,
            degreeClass: 'First Class Honours'
        };
        
        // Calculate totals
        const totalCredits = sampleStudent.courses.reduce((sum, course) => sum + course.credit, 0);
        const totalPoints = sampleStudent.courses.reduce((sum, course) => sum + (course.credit * course.point), 0);
        
        // Generate transcript HTML
        const transcriptHTML = `
            <div class="transcript-header">
                <img src="logo.png" alt="FSS Ibadan Logo" style="height: 80px; margin-bottom: 1rem;">
                <h2>FEDERAL SCHOOL OF STATISTICS, IBADAN</h2>
                <p>P.M.B. 1017, Ibadan, Oyo State, Nigeria</p>
                <h3>OFFICIAL ACADEMIC TRANSCRIPT</h3>
            </div>
            
            <div class="student-info">
                <div>
                    <p><strong>Name:</strong> ${sampleStudent.name}</p>
                    <p><strong>Matriculation Number:</strong> ${sampleStudent.matric}</p>
                    <p><strong>Date of Birth:</strong> ${sampleStudent.dob}</p>
                    <p><strong>State of Origin:</strong> ${sampleStudent.state}</p>
                </div>
                <div>
                    <p><strong>Program:</strong> ${sampleStudent.program}</p>
                    <p><strong>Department:</strong> ${sampleStudent.department}</p>
                    <p><strong>Year of Admission:</strong> ${sampleStudent.admissionYear}</p>
                    <p><strong>Year of Graduation:</strong> ${sampleStudent.graduationYear}</p>
                </div>
            </div>
            
            <table class="transcript-table">
                <thead>
                    <tr>
                        <th>Course Code</th>
                        <th>Course Title</th>
                        <th>Credit Unit</th>
                        <th>Grade</th>
                        <th>Grade Point</th>
                        <th>Session</th>
                        <th>Semester</th>
                    </tr>
                </thead>
                <tbody>
                    ${sampleStudent.courses.map(course => `
                        <tr>
                            <td>${course.code}</td>
                            <td>${course.title}</td>
                            <td>${course.credit}</td>
                            <td>${course.grade}</td>
                            <td>${course.point}</td>
                            <td>${course.session}</td>
                            <td>${course.semester}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            
            <div class="transcript-summary">
                <div class="summary-card">
                    <h4>Total Credit Units</h4>
                    <p>${totalCredits}</p>
                </div>
                <div class="summary-card">
                    <h4>Total Grade Points</h4>
                    <p>${totalPoints.toFixed(2)}</p>
                </div>
                <div class="summary-card">
                    <h4>Cumulative GPA (CGPA)</h4>
                    <p>${sampleStudent.cgpa.toFixed(2)}</p>
                </div>
            </div>
            
            <div class="transcript-summary">
                <div class="summary-card">
                    <h4>Degree Classification</h4>
                    <p>${sampleStudent.degreeClass}</p>
                </div>
            </div>
            
            <div class="signature-area">
                <div class="signature-box">
                    <p>_________________________</p>
                    <p>Student's Signature</p>
                </div>
                <div class="signature-box">
                    <p>_________________________</p>
                    <p>Head of Department</p>
                </div>
                <div class="signature-box">
                    <p>_________________________</p>
                    <p>Registrar</p>
                </div>
            </div>
            
            <div style="margin-top: 2rem; text-align: center; font-size: 0.9rem;">
                <p>This is an official transcript from Federal School of Statistics, Ibadan.</p>
                <p>Issued on: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
        `;
        
        previewContainer.innerHTML = transcriptHTML;
    }

    // Print and download buttons in preview modal
    const printTranscriptBtn = document.getElementById('print-transcript');
    const downloadTranscriptBtn = document.getElementById('download-transcript');
    
    printTranscriptBtn.addEventListener('click', function() {
        window.print();
    });
    
    downloadTranscriptBtn.addEventListener('click', function() {
        alert('This would download the transcript as PDF in a real application');
    });

    // Student management functionality
    const addStudentBtn = document.getElementById('add-student-btn');
    const studentForm = document.getElementById('student-form');
    
    addStudentBtn.addEventListener('click', function() {
        document.getElementById('modal-title').textContent = 'Add New Student';
        studentForm.reset();
        openModal(document.getElementById('student-modal'));
    });
    
    studentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            matricNumber: document.getElementById('matric-number').value,
            department: document.getElementById('department').value,
            program: document.getElementById('program').value,
            admissionYear: document.getElementById('admission-year').value,
            graduationYear: document.getElementById('graduation-year').value,
            status: document.getElementById('student-status').value
        };
        
        // Simulate form submission
        console.log('Student data to be submitted:', formData);
        alert('Student data would be saved to database in a real application');
        closeModal(document.getElementById('student-modal'));
    });

    // Course management functionality
    const addCourseBtn = document.getElementById('add-course-btn');
    const courseForm = document.getElementById('course-form');
    
    addCourseBtn.addEventListener('click', function() {
        document.getElementById('course-modal-title').textContent = 'Add New Course';
        courseForm.reset();
        openModal(document.getElementById('course-modal'));
    });
    
    courseForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            courseCode: document.getElementById('course-code').value,
            courseTitle: document.getElementById('course-title').value,
            creditUnits: document.getElementById('credit-units').value,
            level: document.getElementById('course-level').value,
            department: document.getElementById('course-dept').value,
            semester: document.getElementById('course-semester').value
        };
        
        // Simulate form submission
        console.log('Course data to be submitted:', formData);
        alert('Course data would be saved to database in a real application');
        closeModal(document.getElementById('course-modal'));
    });

    // User management functionality
    const addUserBtn = document.getElementById('add-user-btn');
    const userForm = document.getElementById('user-form');
    
    addUserBtn.addEventListener('click', function() {
        document.getElementById('user-modal-title').textContent = 'Add New User';
        userForm.reset();
        openModal(document.getElementById('user-modal'));
    });
    
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            username: document.getElementById('username').value,
            email: document.getElementById('user-email').value,
            role: document.getElementById('user-role').value,
            password: document.getElementById('user-password').value,
            confirmPassword: document.getElementById('confirm-password').value
        };
        
        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        // Simulate form submission
        console.log('User data to be submitted:', formData);
        alert('User data would be saved to database in a real application');
        closeModal(document.getElementById('user-modal'));
    });

    // Confirmation modal functionality
    const confirmActionBtn = document.getElementById('confirm-action');
    const cancelActionBtn = document.getElementById('cancel-action');
    
    confirmActionBtn.addEventListener('click', function() {
        // In a real app, this would perform the confirmed action
        alert('Action confirmed');
        closeModal(document.getElementById('confirmation-modal'));
    });
    
    cancelActionBtn.addEventListener('click', function() {
        closeModal(document.getElementById('confirmation-modal'));
    });

    // Initialize dashboard stats (simulated)
    document.getElementById('total-students').textContent = '1,245';
    document.getElementById('total-transcripts').textContent = '876';
    document.getElementById('pending-requests').textContent = '32';

    // Initialize recent activity (simulated)
    const activityList = document.getElementById('activity-list');
    const activities = [
        { icon: 'fa-file-alt', text: 'Transcript generated for MATRIC001' },
        { icon: 'fa-user-plus', text: 'New student added' },
        { icon: 'fa-edit', text: 'Course STA 101 updated' },
        { icon: 'fa-user', text: 'User admin logged in' },
        { icon: 'fa-file-alt', text: 'Transcript generated for MATRIC002' }
    ];
    
    activities.forEach(activity => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas ${activity.icon}"></i> ${activity.text}`;
        activityList.appendChild(li);
    });

    // Initialize department dropdowns (simulated)
    const departments = [
        'Statistics',
        'Mathematics',
        'Computer Science',
        'Economics',
        'Demography'
    ];
    
    const departmentDropdowns = document.querySelectorAll('#department, #course-dept, #dept-filter');
    departmentDropdowns.forEach(dropdown => {
        // Clear existing options except the first one
        while (dropdown.options.length > 1) {
            dropdown.remove(1);
        }
        
        // Add departments
        departments.forEach(dept => {
            const option = document.createElement('option');
            option.value = dept;
            option.textContent = dept;
            dropdown.appendChild(option);
        });
    });

    // Initialize students table (simulated)
    const studentsTable = document.querySelector('#students-table tbody');
    const sampleStudents = [
        { matric: 'FSS/18/001', name: 'Adeola Johnson', department: 'Statistics', program: 'BSc', admissionYear: '2018', status: 'Graduated' },
        { matric: 'FSS/19/045', name: 'Chinedu Okoro', department: 'Mathematics', program: 'HND', admissionYear: '2019', status: 'Active' },
        { matric: 'FSS/20/112', name: 'Amina Mohammed', department: 'Computer Science', program: 'ND', admissionYear: '2020', status: 'Active' },
        { matric: 'FSS/17/023', name: 'Emeka Nwachukwu', department: 'Economics', program: 'BSc', admissionYear: '2017', status: 'Graduated' },
        { matric: 'FSS/21/087', name: 'Fatima Abubakar', department: 'Demography', program: 'HND', admissionYear: '2021', status: 'Active' }
    ];
    
    sampleStudents.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.matric}</td>
            <td>${student.name}</td>
            <td>${student.department}</td>
            <td>${student.program}</td>
            <td>${student.admissionYear}</td>
            <td><span class="status-badge ${student.status.toLowerCase()}">${student.status}</span></td>
            <td>
                <button class="action-btn view-btn"><i class="fas fa-eye"></i></button>
                <button class="action-btn edit-btn"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete-btn"><i class="fas fa-trash"></i></button>
            </td>
        `;
        studentsTable.appendChild(row);
    });

    // Initialize courses table (simulated)
    const coursesTable = document.querySelector('#courses-table tbody');
    const sampleCourses = [
        { code: 'STA 101', title: 'Introduction to Statistics', credit: 3, department: 'Statistics', level: '100', semester: 'First' },
        { code: 'STA 201', title: 'Statistical Inference', credit: 3, department: 'Statistics', level: '200', semester: 'First' },
        { code: 'MAT 101', title: 'General Mathematics I', credit: 3, department: 'Mathematics', level: '100', semester: 'First' },
        { code: 'CSC 101', title: 'Introduction to Computer Science', credit: 2, department: 'Computer Science', level: '100', semester: 'First' },
        { code: 'ECO 101', title: 'Principles of Economics', credit: 3, department: 'Economics', level: '100', semester: 'First' }
    ];
    
    sampleCourses.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.code}</td>
            <td>${course.title}</td>
            <td>${course.credit}</td>
            <td>${course.department}</td>
            <td>${course.level}</td>
            <td>${course.semester}</td>
            <td>
                <button class="action-btn edit-btn"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete-btn"><i class="fas fa-trash"></i></button>
            </td>
        `;
        coursesTable.appendChild(row);
    });

    // Initialize users table (simulated)
    const usersTable = document.querySelector('#users-table tbody');
    const sampleUsers = [
        { username: 'admin', name: 'System Administrator', email: 'admin@fssibadan.edu.ng', role: 'Administrator', lastLogin: '2023-05-15 09:30' },
        { username: 'registrar', name: 'School Registrar', email: 'registrar@fssibadan.edu.ng', role: 'Registrar', lastLogin: '2023-05-14 14:15' },
        { username: 'staff1', name: 'Academic Staff', email: 'staff1@fssibadan.edu.ng', role: 'Staff', lastLogin: '2023-05-12 11:20' }
    ];
    
    sampleUsers.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.lastLogin}</td>
            <td>
                <button class="action-btn edit-btn"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete-btn"><i class="fas fa-trash"></i></button>
            </td>
        `;
        usersTable.appendChild(row);
    });

    // Add event listeners for edit/delete buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.edit-btn')) {
            // Handle edit action
            const row = e.target.closest('tr');
            alert('Edit functionality would be implemented here');
        }
        
        if (e.target.closest('.delete-btn')) {
            // Handle delete action
            const row = e.target.closest('tr');
            
            // Show confirmation modal
            document.getElementById('confirmation-message').textContent = 'Are you sure you want to delete this record?';
            openModal(document.getElementById('confirmation-modal'));
            
            // Store reference to the row to be deleted
            confirmActionBtn.dataset.row = row;
        }
        
        if (e.target.closest('.view-btn')) {
            // Handle view action
            const row = e.target.closest('tr');
            const matric = row.cells[0].textContent;
            
            // Simulate searching for this student
            studentIdInput.value = matric;
            simulateStudentSearch(matric);
            
            // Switch to generate transcript tab
            navLinks.forEach(navLink => navLink.parentElement.classList.remove('active'));
            document.querySelector('.sidebar a[href="#generate"]').parentElement.classList.add('active');
            
            contentSections.forEach(section => section.classList.remove('active'));
            document.getElementById('generate').classList.add('active');
        }
    });

    // Form submission handlers
    document.getElementById('system-settings-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('System settings would be saved in a real application');
    });
    
    document.getElementById('grading-system-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Grading system would be saved in a real application');
    });
});