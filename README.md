# wdi-second-project



to show the list and the username
</div>
    <ul>

        <li>
          <h3 class="title is-4"><a href="/lists/<%= list.id %>/edit"><%= list.name %></a></h3>
          <p class="subtitle is-6">By <%= list.createdBy.username %></p>
          <br>
        </li>
      <% }}) %>
    </ul>
  </div>
