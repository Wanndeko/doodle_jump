document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid')
    const doodler = document.createElement('div')
    let doodler_left_space = 50
    let start_point = 150
    let doodler_bottom_space = start_point
    let is_game_over = false
    let plataform_count = 5
    let plataforms = []
    let up_timer_id
    let down_timer_id
    let is_jumping = true
    let is_going_left = false
    let is_going_righ = false
    let lef_timer_id
    let righ_timer_id
    let score = 0
    function create_doodler() {
        grid.appendChild(doodler)
        doodler.classList.add('doodler')
        doodler_left_space = plataforms[0].left
        doodler.style.left = doodler_left_space + 'px'
        doodler.style.bottom = doodler_bottom_space + 'px'
    }


    class Plataform {
        constructor(new_plataform_bottom) {
            this.bottom = new_plataform_bottom
            this.left = Math.random() * 315
            this.visual = document.createElement('div')

            const visual = this.visual
            visual.classList.add('plataform')
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'
            grid.appendChild(visual)
        }
    }


    function create_plataform() {
        for (let i = 0; i < plataform_count; i++) {
            let plataform_gap = 600 / plataform_count
            let new_plataform_bottom = 100 + i * plataform_gap
            let new_plataform = new Plataform(new_plataform_bottom)
            plataforms.push(new_plataform)
            console.log(plataforms)

        }

    }



    function move_plataforms() {
        if (doodler_bottom_space > 200) {
            plataforms.forEach(plataform => {
                plataform.bottom -= 4
                let visual = plataform.visual
                visual.style.bottom = plataform.bottom + 'px'

                if (plataform.bottom < 10) {
                    let first_plataform = plataforms[0].visual
                    first_plataform.classList.remove('plataform')
                    plataforms.shift()
                    score ++
                    console.log(plataforms)
                    let new_plataform = new Plataform(600)
                    plataforms.push(new_plataform)
                }
            })
        }
    }

    function jump() {
        clearInterval(down_timer_id)
        is_jumping = true
        up_timer_id = setInterval(function () {
            doodler_bottom_space += 20
            doodler.style.bottom = doodler_bottom_space + 'px'
            if (doodler_bottom_space > start_point + 200) {
                fall()
            }

        }, 30)
    }

    function fall() {
        clearInterval(up_timer_id)
        is_jumping = false
        down_timer_id = setInterval(function () {
            doodler_bottom_space -= 5
            doodler.style.bottom = doodler_bottom_space + 'px'
            if (doodler_bottom_space <= 0) {
                game_over()
            }
            plataforms.forEach(plataform => {
                if (
                    (doodler_bottom_space >= plataform.bottom) &&
                    (doodler_bottom_space <= plataform.bottom + 15) &&
                    ((doodler_left_space + 60) >= plataform.left) &&
                    (doodler_left_space <= (plataform.left + 85)) &&
                    !is_jumping
                ) {
                    console.log('landed')
                    start_point = doodler_bottom_space
                    jump()
                }
            })
        }, 30)
    }


    function game_over() {
        console.log('game over ')
        is_game_over = true
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild)
        }
        grid.innerHTML = score
        clearInterval(up_timer_id)
        clearInterval(down_timer_id)
        clearInterval(lef_timer_id)
        clearInterval(righ_timer_id)


    }

    function control(e) {
        if (e.key === "ArrowLeft") {
            move_left()
        } else if (e.key === "ArrowRight") {
            move_right()

        } else if (e.key === "ArrowUp") {
            move_Straight()

        }
    }


    function move_left() {
        if (is_going_righ) {
            clearInterval(righ_timer_id)
            is_going_righ = false
        }
        is_going_left = true
        lef_timer_id = setInterval(function () {
            if (doodler_left_space >= 0) {
                doodler_left_space -= 5
                doodler.style.left = doodler_left_space + 'px'
            } else move_right()

        }, 20)

    }

    function move_right() {
        if (is_going_left) {
            clearInterval(lef_timer_id)
            is_going_left = false
        }
        is_going_righ = true
        righ_timer_id = setInterval(function () {
            if (doodler_left_space <= 340) {
                doodler_left_space += 5
                doodler.style.left = doodler_left_space + 'px'
            } else move_left()
        }, 20)
    }

    function move_Straight() {
        is_going_left = false
        is_going_righ = false
        clearInterval(lef_timer_id)
        clearInterval(righ_timer_id)

    }


    function start() {
        if (!is_game_over) {
            create_plataform()
            create_doodler()
            setInterval(move_plataforms, 30)
            jump()
            document.addEventListener('keyup', control)
        }

    }

    // anexar botão
    start()


})