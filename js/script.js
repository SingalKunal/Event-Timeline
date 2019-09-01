$(function(){

    // Adding cat and day tags

    let addedcats = [];

    $('.cat-input .fa-plus').click(function(){
        let cat = $('.cat-input input[type=text]').val();

        if(cat != '') {
            $('.modal-dialog .cat-tags')
                .append(`<div class="tag">
                        <div class="text">${cat}</div>
                        <i class="fas fa-times"></i>
                    </div>`).css('display', 'none').fadeIn();
            
            addedcats.push(cat);  
            $('.cat-input input[type=text]').val('');
            $('.cat-input input[type=text]').focus();
        }
    });

    let addeddays = [];

    $('.day-input .fa-plus').click(function() {
        let day = $('#day').val();
        let session = $('#session').val();
        let time = $('#time').val();
        let venue = $('#venue').val();

        if(day != '' && session != '' && time != '' && venue != '') {
            $('.modal-dialog .day-tags')
                .append(`<div class="tag">
                        <div>Day${day}:</div>
                        <div>${session}</div>
                        <div>${time}</div>
                        <div>${venue}</div>
                        <i class="fas fa-times"></i>
                    </div>`).css('display','none').fadeIn();

                addeddays.push(['Day'+day+':', session, time, venue]);
                $('#day').val('');
                $('#session').val('');
                $('#time').val('');
                $('#venue').val('');
        }
    });


    // Removing cat and day tags

    $('.cat-tags').on('click', '.fa-times', function() {
        // alert('clicked');
        let tag = $(this).parent();
        let removeVal = tag.children('div').html();
        // alert(removeVal);
        addedcats = addedcats.filter(function(value) {
            return value != removeVal;
        });

        // addedcats.forEach(function(item) {
        //     alert(item);
        // });

        tag.fadeOut(function() {
            $(this).remove();
        })
    });

    $('.day-tags').on('click', '.fa-times', function() {
        // alert('clicked');
        let tag = $(this).parent();
        let removeVal = [];
        let dayDivs = tag.children('div');
        // console.log(dayDivs);
        $.each(dayDivs, function() {
            removeVal.push($(this).html());
        });
        // console.log(removeVal);
        addeddays = addeddays.filter(function(value) {
            return JSON.stringify(value) != JSON.stringify(removeVal);
        });

        // console.log(addeddays);

        tag.fadeOut(function() {
            $(this).remove();
        })
    });

    

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            var result;
            
            reader.onload = function(e) {
              $('#chosenimg').attr('src', e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
            return result;
          }
    }


    $('#chooseimg').change(function() {
        readURL(this);
    });

    $('.modal-dialog').on('click', '#addevent', function () {
        // alert('cliked');
        let eventname = $('#eventname').val();
        let eventype = $('#eventype').val();
        let eventdescrip = $('#eventdescrip').val();
        let rulebookurl = $('#rulebookurl').val();
        let imgsrc = $('#chosenimg').attr('src');

        
        let result = `<div class="card">
                        <!-- Banner with event type and name -->
                        <img src="${imgsrc}" alt="">
                        <div class="banner-lead">
                            <h2>${eventype}</h2>
                            <h4>${eventname}</h4>
                        </div>
                        <hr class="hr1">

                        <!-- Event Description -->
                        <div class="wrap">
                            <p class="card-descrip">${eventdescrip}</p>
                        </div>
                        <hr class="hr1">
                        <!-- Categories -->
                        <div class="wrap">
                            <h4>Categories:</h4>
                            <hr class="hr2">
                            <ul class="card-cats">`;

        // $.each('addedcats', function(index, value) {
        //     result += `<li>${value}</li>`;
        // });

        addedcats.forEach(function(value) {
            result += `<li>${value}</li>`
        });

        result += `</ul>
                    <hr class="hr2">
                    </div>
                    
                    <!-- Days -->
                    <div class="wrap">
                        <h4>Days:</h4>
                        <hr class="hr2">
                        <table class="card-days">`;
        // $.each('addeddays', function(index, vlaue) {
        //     result += `<tr>`;
        //     $.each(value, function(index, value) {
        //         result += `<td>${value}</td>`;
        //     }); 
        // });

        addeddays.forEach(function(value) {
            result += `<tr>`;
            value.forEach(function(item) {
                result += `<td>${item}</td>`;
            });
        });

        result += `</tr>
                    </table>
                    <hr class="hr2">
                </div>
                <!-- Rulebook Url  -->
                <div class="card-url">
                            Rulebook Url: <a href="${rulebookurl}">${rulebookurl}</a>
                </div><br>
                <hr class="hr1">
                <!-- Footer (edit and del btn) -->
                <section class="card-footer">
                        <button type="button" class="btn btn-editevent mr-2" data-toggle="modal" data-target=".bd-example-modal-lg"><i class="far fa-edit"></i> Edit Event</button>
                    <button type="button" class="btn btn-danger"><i class="far fa-trash-alt"></i> Delete</button>
                </section>
            </div>`;

        console.log(result);        
        $('.cards').append(result);
    });
    

    // Deleting Card
    $('.cards').on('click', '.card-footer .btn-danger', function() {
        $(this).parents('.card').slideUp(function (){
            $(this).remove();
        });
    });
});