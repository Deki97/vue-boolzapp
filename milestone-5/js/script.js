// Milestone 2
// [x] Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
// [x] Click sul contatto mostra la conversazione del contatto cliccato

// Milestone 3
// [x] Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde
// [x] Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.

// Milestone 4, opzionale per oggi:
// [x] Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

// Milestone 5
// Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato
// Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti.


Vue.config.devtools = true;


const app = new Vue(
    {
        el: '#root',
        data: {
            myMessage: '',
            activeContact: 0,
            searchResult: '',
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Ricordati di dargli da mangiare',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            text: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            text: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            text: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            text: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            text: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            text: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Luisa',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
            ]
        },
        methods: {
            // Al click del contatto nella lista di sinistra, compare la conversazione con quel contatto a destra
            changeContact: function(index) {
                this.activeContact = index;
                // alert(this.activeContact);
            },
            // Invio di un nuovo messaggio che viene aggiunto come nuovo oggetto nei messaggi del contatto attivo
            newSentMessage: function() {
                // alert(this.myMessage);

                if(this.myMessage.trim().length > 0) {
                    this.contacts[this.activeContact].messages.push(
                        {
                            date: this.getCurrentDateAndTime(),
                            text: this.myMessage,
                            status: 'sent'
                        }
                    );
                }
                // alert(this.myMessage);

                this.myMessage = ''
            },
            // Funzione di risposta automatica che dopo 1 secondo risponde con 'ok'
            autoReplyOk: function() {
                setTimeout(() => {
                    this.contacts[this.activeContact].messages.push(
                        {
                            date: this.getCurrentDateAndTime(),
                            text: 'ok',
                            status: 'received'
                        }
                    );
                }, 1000);
            },
            // Metodo tramite day.js per ottenere data e ora correnti
            getCurrentDateAndTime() {
                return dayjs().format("DD/MM/YYYY HH:mm:ss");
            },
            // Funzione di ricerca per filtrare le chat in base al nome dell'utente
            searchUserList: function() {
                this.contacts.forEach((element) => {
                    if(element.name.toLowerCase().includes(this.searchResult.toLowerCase())) {
                        element.visible = true;
                    } else {
                        element.visible = false;
                    }
                });
            },
            showMessageOptions: function(index) {
                
                const optionsDiv = document.getElementById('single-chat-options');
                optionsDiv.classList.toggle("block");

                // Indice di ogni messaggio sul quale clicco
                // console.log(index);
            },
            deleteCurrentMessage: function(index) {
                // alert('test');
                this.contacts[this.activeContact].messages.splice(index, 1);
            }
        }
    }
);
