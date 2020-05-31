localStorage;

var eventsURL = 'https://rotarasov.pythonanywhere.com/events/';
var usersURL = 'https:rotarasov.pythonanywhere.com/users';

async function getEvResp(id){
    const response = await fetch(eventsURL+id);
    const resp = await response.json();
    return resp;
}

 async function getAllEventsResponse(url) {
             const response = await fetch(url);
             const resp = await response.json();

             const res = resp['results'];
             console.log(res);
             return res;
}

function LogIn() {

}

function createEventCard(event_card_info, incarousel){
    eventCard = document.createElement('div');
    eventCard.className = 'event';
    var idval = 0;
    incarousel ? idval = 'car-'+ event_card_info.id : idval = event_card_info.id;
    eventCard.setAttribute('id', idval);
    eventCard.setAttribute('onclick', 'openEventPage(this.id)');

    image = document.createElement("img");
    image.setAttribute('src', event_card_info.image);
    eventCard.appendChild(image);

    eventName = document.createElement("p");
    eventName.setAttribute('class', "event-name");
    eventName.appendChild(document.createTextNode(event_card_info.title));
    eventCard.appendChild(eventName);

    eventType = document.createElement("p");
    eventType.setAttribute('class', "event-type");
    eventType.appendChild(document.createTextNode(event_card_info.type));
    eventCard.appendChild(eventType);

    eventDate = document.createElement("p");
    eventDate.setAttribute('class', "event-date");
    eventDate.appendChild(document.createTextNode(string2date(event_card_info.start_date)));
    eventCard.appendChild(eventDate);

    return eventCard;
}

function string2date(datestr){
    //"2020-06-05T20:00:00Z" 5.06
    var dateinfo= datestr.substr(0,10).split('-');
    month = dateinfo[1];
    monthval = '';
    dayval = dateinfo[2][0] === '0' ? dateinfo[2].substr(1,1) : dateinfo[2];
    switch (month) {
        case '01':
            monthval = 'января';
            break;
        case '02':
            monthval = 'февраля';
            break;
        case '03':
            monthval = 'марта';
            break;
        case '04':
            monthval = 'апреля';
            break;
        case '05':
            monthval = 'мая';
            break;
        case '06':
            monthval = 'июня';
            break;
        case '07':
            monthval = 'июля';
            break;
        case '08':
            monthval = 'августа';
            break;
        case '09':
            monthval = 'сентября';
            break;
        case '10':
            monthval = 'января';
            break;
        case '11':
            monthval = 'ноября';
            break;
        case '12':
            monthval = 'декабря';
            break;
    }
    res = dayval + " " + monthval;
    return res;
}

async function createEventPageMarkup(eid){
    var event = await getEvResp(eid);
    var eventwrap = document.getElementById('event-wrapper');
    var event_info = document.createElement('div');
    event_info.setAttribute('id', 'event-info');

    var eventImg = document.createElement('img');
    eventImg.setAttribute('src', event.image);
    event_info.appendChild(eventImg);

    var eventLeft = document.createElement('div');
    eventLeft.setAttribute('id', 'event-left');

    var eventTitle = document.createElement('h1');
    eventTitle.appendChild(document.createTextNode(event.title));
    eventLeft.appendChild(eventTitle);

    var event_type = document.createElement('p');
    event_type.appendChild(document.createTextNode("Тип мероприятия: " + event.type));
    eventLeft.appendChild(event_type);

    var event_start = document.createElement("p");
    event_start.appendChild(document.createTextNode("Начало: " + string2date(event.start_date)));
    eventLeft.appendChild(event_start);

    var event_end = document.createElement("p");
    event_end.appendChild(document.createTextNode("Окончание: " + string2date(event.end_date)));
    eventLeft.appendChild(event_end);

    var event_link = document.createElement('a');
    event_link.setAttribute('href', event.link);
    event_link.innerHTML = "Ссылка на сайт мероприятия";
    eventLeft.appendChild(event_link);

    var interestedBtn = document.createElement('button');
    interestedBtn.setAttribute('type', 'submit');
    interestedBtn.setAttribute('onclick', 'imGoing()');
    interestedBtn.setAttribute('id', 'interested-btn');
    eventLeft.appendChild(interestedBtn);

    var findAteamBtn = document.createElement('button');
    interestedBtn.setAttribute('type', 'submit');
    interestedBtn.setAttribute('onclick', 'openTeamApplicationPage()');
    interestedBtn.setAttribute('id', 'interested-btn');

    var event_descr = document.createElement('p');
    event_descr.appendChild(document.createTextNode(event.description));

    event_info.appendChild(eventLeft);
    event_info.appendChild(event_descr);
    eventwrap.appendChild(event_info);
}

async function openEventPage(id) {
    var eid;
    id.length > 1 ? eid = id.substr(4) : eid = id;
    console.log(event);
    window.open('event_page.html', '_self');
    createEventPageMarkup(eid);
}
async function fillCarousel() {
    let events = await getAllEventsResponse(eventsURL);
    for(let j = 0; j < 3; j++){
        var info = events[j];
        var eventCard = createEventCard(info, true);
        document.getElementById('event-carousel').appendChild(eventCard);
    }
}

async function displayEvents() {
    let events = await getAllEventsResponse(eventsURL);
    let event_card_info;
    for (let j = 0; j < events.length; j++) {
        event_card_info = events[j];
        var eventCard = createEventCard(event_card_info, false);
        document.getElementById('wrapper').appendChild(eventCard);
    }
}

async function registerUser() {
    var name = (document.getElementById('first-last-name').value.split(' '));
    var firstname = name[0];
    var lastname = name[1];
    var email = document.getElementById('e-mail').value;
    var password = document.getElementById('password').value;
    var passwordconf = document.getElementById('password-confirmation').value;

    var query = usersURL + 'register?';
    query += 'email=' + email + '&';
    query += 'first_name=' + firstname + '&';
    query += 'last_name=' + lastname + '&';
    query += 'password=' + password + '&';
    query += 'confirm_password=' + passwordconf;
    var userdata = postUser(query);
    console.log(userdata);
}

async function postUser(query) {
    try {
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: query,
        };
        const response = await fetch(usersURL, config);
        //const json = await response.json()
        if (response.ok) {
            //return json;
            return response;
        } else {
            //
        }
    } catch (error) {
        console.error();
    }
}
