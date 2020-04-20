let reload = 0;
const players = [];

let textarea = document.getElementById("pl");

addPlayer = function () {
    playerName = document.querySelector('#apt').value;
    if (playerName !== "") {
        if (players.indexOf(playerName) == -1) {
            players.push(playerName);
        }
    }

    let textarea = document.getElementById("pl");
    textarea.value = players.join("\n");
}

clrPlayers = function () {
    players.length = 0;
    textarea.value = ""
};

const showGroups = groups => {
    Object.values(groups).forEach((group, index) => {
        const template = document.querySelector('template').cloneNode(true);
        const templateContent = template.content;


        const p = templateContent.querySelector('p');
        p.textContent = p.textContent.replace('{{group}}', index);

        const ul = templateContent.querySelector('ul');

        group.map(player => {
            const li = document.createElement('li');
            li.textContent = player;
            ul.appendChild(li);
        })

        const wrapper = document.querySelector(".wrapper");
        wrapper.appendChild(templateContent);

    })
}

const splitPlayers = (e) => {
    e.preventDefault();
    const {
        target
    } = e;
    const {
        numberOfPlayers,
        numberOfGroups
    } = target;
    const correctNumberOfPlayers = numberOfPlayers.value * numberOfGroups.value;

    const playersCopy = players.slice(0, correctNumberOfPlayers);

    const groups = {};
    Array(+numberOfGroups.value).fill(0).forEach((_, index) => groups[`group_${index}`] = []);

    playersCopy.forEach(player => {
        let index = Math.floor(Math.random() * +numberOfGroups.value);
        let group = groups[`group_${index}`];

        if (
            Object.values(groups).some(group => group.includes(player))
        ) return;

        while (
            group.length === +numberOfPlayers.value ||
            group.includes(player)
        ) {
            index = Math.floor(Math.random() * +numberOfGroups.value);
            group = groups[`group_${index}`];
        }

        group.push(player);
    });

    showGroups(groups);

}



const reloadPage = () => {
    document.querySelector('.wrapper').innerHTML = "";
}



const splitPlayersForm = document.querySelector('#split_players_form');
splitPlayersForm.addEventListener('submit', splitPlayers);

document.querySelector('#split_players_form').addEventListener('click', reloadPage);
