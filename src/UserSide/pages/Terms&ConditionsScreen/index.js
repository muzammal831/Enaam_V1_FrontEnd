import React from 'react'
import Header from '../../Components/HeaderComponent';
import Footer from '../../Components/FooterCompnent';
import "../../css/Styles.css"

const TermsConditions = () => {
  return (
    <div>
      <Header />
      <div style={{ height: "15vh" }} />
      <div class="container-fluid " style={{ marginBottom: "30px" }}>
        <div class="row">
          <div class="col-lg-8 offset-lg-2 ">
            <div class="card  p-4 glow">
              <h2 class="text-center mb-4">Terms & Conditions</h2>
              <ol class="list-group list-group-flush">
                <li class="list-group-item">
                  <strong>Eligibility:</strong>
                  <p>Enaam, a quiz-based contest with prizes, is available to anybody who is 18 years of age or older. The game is not open to the direct family members of the game organizer's employees, agents, and representatives.</p>
                </li>
                <li class="list-group-item">
                  <strong>Contestants must register:</strong>
                  <p>Contestants must register on the Enaam website or app and provide accurate and complete information in order to take part in the game. Incomplete, incorrect, or illegible entries will not be accepted.</p>
                </li>
                <li class="list-group-item">
                  <strong>Game Rules:</strong>
                  <p>There are series of questions in the game and only those who answer the questions correctly will enter the lucky draw. The draw will decide the winner.</p>
                </li>
                <li class="list-group-item">
                  <strong>Prizes:</strong>
                  <p>At the end of the game, the winner's award will be announced. No cash or other items may be swapped for the prize, which is non-transferable.</p>
                </li>
                <li class="list-group-item">
                  <strong>Winner Notification:</strong>
                  <p>Within 48 hours after the draw, the winner will be contacted by phone or email. The reward will be forfeited and a new winner will be chosen if the winner doesn't respond within 1 day of being notified.</p>
                </li>
                <li class="list-group-item">
                  <strong>Disqualification:</strong>
                  <p>The game organizer reserves the right to disqualify any contestant who violates the terms and conditions of the game or engages in any fraudulent activity.</p>
                </li>
                <li class="list-group-item">
                  <strong>Liability:</strong>
                  <p>The game organizer is not responsible for any loss, damage, injury, or harm caused to the contestant during the game. The contestant participates in the game at their own risk.</p>
                </li>
                <li class="list-group-item">
                  <strong>Non-Refundable:</strong>
                  <p>There is no refund on any stage of the game or in case of losing it.</p>
                </li>
                <li class="list-group-item">
                  <strong>Modification:</strong>
                  <p>The game organizer reserves the right to modify, suspend, or cancel the game at any time without prior notice.</p>
                </li>
                <li class="list-group-item">
                  <strong>Governing Law:</strong>
                  <p>The game is governed by the laws of the country where the game is being held.</p>
                </li>
                <li class="list-group-item">
                  <strong>Agreement:</strong>
                  <p>By participating in the game, the contestant agrees to abide by these terms and conditions and the decisions of the game organizer, which are final and binding.</p>
                </li>
                <li class="list-group-item">
                  <strong>User Account Deletion:</strong>
                  <p>If a user want to request his/her account to be deleted ,please contact at info@enaam.pk</p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default TermsConditions;