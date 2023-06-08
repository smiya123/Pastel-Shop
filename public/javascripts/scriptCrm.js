/*coding the mobile navbar*/

const newBtn = document.getElementById('new-employee');

if (newBtn) {
    newBtn.addEventListener('click', () => {
        const { value: formValues } = Swal.fire({
            title: 'New Employee',
            html:
              '<form id="employee-form" action="/crm/addEmployee" method="POST">' +
                '<input name="fullname" class="swal2-input" placeholder="Full Name">' +
                '<input name="login" class="swal2-input" placeholder="Login">' +
                '<input name="password" type="password" class="swal2-input" placeholder="Password">' +
              '</form>',
            focusConfirm: false,
            preConfirm: () => {
              document.getElementById('employee-form').submit();
            }
          })
          
          if (formValues) {
            Swal.fire(JSON.stringify(formValues))
          }
    })
}

function respondIssue (elm) {
    console.log("email : ", elm.dataset.email);
    const { value: formValues } = Swal.fire({
        title: 'Respond Issue',
        html:
          '<form id="respond-form" action="/crm/respond_issue" method="POST">' +
            '<input name="id_issue" type="hidden" class="swal2-input" value="'+elm.dataset.issue+'">' +
            '<input name="email" class="swal2-input" placeholder="Email" value="'+elm.dataset.email+'">' +
            '<textarea name="response" class="swal2-input" placeholder="Login"> </textarea>' +
          '</form>',
        focusConfirm: false,
        preConfirm: () => {
          document.getElementById('respond-form').submit();
        }
      })
      
      if (formValues) {
        Swal.fire(JSON.stringify(formValues))
      }
};
