export async function notshow(id, token, sShowErr) {
    const api_url = global.url_stories+id;
    fetch(api_url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token
        },
        body: JSON.stringify({
          title: '',
          content: '',
          author_visible: false
        }),
    })
    .then(response => {
        const status = response.status;
        if (status !== 204) {
            const contentType = response.headers.get("Content-Type");
            if (contentType && contentType.includes("application/json")) {
                return response.json().then(data => {
                    sShowErr(data.message);
                });
            } else {
                return response.text().then(message => {
                    sShowErr(message || "Errore sconosciuto");
                });
            }
        }
    })
    .catch(error => {
        console.log(error);
        sShowErr("Errore interno");
    });
}

export async function show(id, token, sShowErr) {
    const api_url = global.url_stories+id;
    fetch(api_url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token
        },
        body: JSON.stringify({
          title: '',
          content: '',
          author_visible: true
        }),
    })
    .then(response => {
        const status = response.status;
        if (status !== 204) {
            const contentType = response.headers.get("Content-Type");
            if (contentType && contentType.includes("application/json")) {
                return response.json().then(data => {
                    sShowErr(data.message);
                });
            } else {
                return response.text().then(message => {
                    sShowErr(message || "Errore sconosciuto");
                });
            }
        }
    })
    .catch(error => {
        console.log(error);
        sShowErr("Errore interno");
    });
}